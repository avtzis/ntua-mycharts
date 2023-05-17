const stripe = require("stripe")('sk_test_51Mw3DIEK88WmOQk2MaaK0b5Ko9rSwXpGrKKg1BM92PsCvyJhYTbNmCWldqphFmMfwMLEuSkhjvbbiH4YomLiTH9h00A4buE4bd');
const Credits = require("../models/Credits");
const Payment = require("../models/Payment");
const User = require("../models/User");

exports.getCredits = async (req, res) => {
  const credits = await Credits.find({ active: true });
  return res.status(200).json({message: 'success', tiers: credits});
};

exports.postPurchase = async (req, res) => {
  const tierId = req.query.id;
  const userId = req.userId;

  const tier = await Credits.findById(tierId);
  if(!tier) {
    return res.status(400).json({message: 'no such tier'});
  }

  stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: `${tier.title} Package`
        },
        unit_amount: tier.price * 100
      },
      quantity: 1
    }],
    success_url: 'http://localhost:3000/api/credits/success?sessionId={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/dashboard'
  }).then(session => {
    Payment.create({ sessionId: session.id, item: tierId, user: userId });
    res.status(200).json({url: session.url});
  }).catch(err => {
    console.error(err);
  })
}

exports.getSuccess = async (req, res) => {
  const sessionId = req.query.sessionId;

  stripe.checkout.sessions.retrieve(sessionId).then(response => {
    if(response && response.payment_status === 'paid' && response.status === 'complete') {
      Payment.findOne({ sessionId, paid: false }).then(async payment => {
        if(!payment) throw {message: 'invalid payment'};
        payment.paid = true;
        payment.save();
        
        const user = await User.findById(payment.user);
        const tier = await Credits.findById(payment.item);
        const credits = tier['credits'];
  
        user.credits += credits;
        await user.save();
        res.redirect('http://localhost:3000/purchase/thankyou');
      }).catch(error => {
        console.error(error);
        res.status(400).json({error});
      })
    } else {
      throw {message: 'invalid payment'};
    }
  }).catch(error => {
    console.error(error);
    res.status(400).json({error});
  });
}