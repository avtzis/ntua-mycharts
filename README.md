## setup - docker
1. install `docker` `docker-compose`
2. tin prwti fora:
      ```sh
      sudo docker-compose up --build
      ```
      gia silent mode: `-d`
      
    apo kei kai meta:

      ```sh
      sudo docker-compose up
      ```
    gia allages:

      ```sh
      sudo docker-compose up --build --remove-orphans --force-recreate
      ```

3. gia ploigisi:
    * frontend: `localhost:3000/`
    * services: `localhost:3000/api/*`


## ti exei meinei
* frontend:
  - [ ] logo
  - [ ] theme (light kai dark)
  - [x] static preview pics on landing page
* backend:
  - [x] fix csv templates
  - [x] finish csv validation
  - [x] implement 'get templates' endpoint
* general:
  - [x] split backend into microsevrices
  - [ ] add rabbitm queue
  - [x] add issues
  - [x] switch docker to prod mode
  - [ ] host app on aws
  - [ ] readme
  - [ ] uml final form (+ github links)
  - [ ] add comments to code
  - [ ] stress tests
  - [ ] Ενημερωμένος δικτυακός τόπος στο GitHub με την πορεία διαχείρισης του έργου με 3-4 sprints ?????????


## λειτουργίες

- [x] Διαχείριση χρηστών και είσοδο με λογαριασμό Google
- [x] protupa arxeia dedomenwn (csv templates) gia ola ta charts
- [x] Κατέβασμα πρότυπου αρχείου δεδομένων και παραμέτρων μορφοποίησης, για κάθε υποστηριζόμενο τύπο διαγράμματος
- [x] Ανέβασμα αρχείου δεδομένων και παραμέτρων μορφοποίησης
- [x] elegxos egkurotitas arxeiou
- [x] proepiskopisi diagrammatos pou dimiourgeitai
- [x] Δημιουργία διαγράμματος και αποθήκευση στον server στους υποστηριζόμενους μορφότυπους pdf, png, svg και html
- [x] Εμφάνιση των διαγραμμάτων που έχει δημιουργήσει κάθε χρήστης
- [x] δυνατότητα κατεβάσματος του επιλεγμένου μορφότυπου
- [x] proepiskopisi tou epilegmenou morfotupou
- [x] Διαχείριση credits που επιτρέπουν τη δημιουργία διαγραμμάτων
- [x] agora credits


