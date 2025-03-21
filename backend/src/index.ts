import express from "express"
import sqlite3 from "sqlite3";
import dataSource from "./config/db";


const db = new sqlite3.Database('good_corner.sqlite');

const port =3000;
const app = express();

app.use(express.json());

//Request Handler
//req : requete, res : response (le _req pour dire à typescript que l'on sait que l'on doit préciser le request)
app.get("/ads", (_req, res) => {
    db.all("SELECT * FROM ads", (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).send("An error occurred"); 
      }
      res.send(rows); 
    });
  });
  

// app.get("/ads", (_req, res) => {
//     res.send(ads);
// });

// app.post("/ads", (req, res) => {
//     console.log(req.body);
//     ads.push(req.body);
//     res.send('données envoyées');
// });

app.post('/ads', (req, res) => {
    const stmt = db.prepare(
        'INSERT INTO ads (title, description, author, price, createdAt, image, city) VALUES (?,?,?,?,?,?,?)'
    );
    stmt.run([
        req.body.title,
        req.body.description,
        req.body.author,
        req.body.price,
        req.body.createdAt,
        req.body.image,
        req.body.city
    ], (err) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.send('Ad has been created')
        }
      })
    });



//:id les deux points indiquent que c'est un paramètre de route
app.delete("/ads/:id", (req, res) => {
    const id = req.params.id;
    const stmt = db.prepare('DELETE FROM ads WHERE id = ?');

    stmt.run([id],(err) => {
        if (err) {
          res.status(500).send(err)
        } else {
          return res.send(`Ad n°${id} has been deleted`)
        }
      });
});



app.put("/ads/:id", (req, res) => {
    const id = req.params.id;
    const stmt = db.prepare(
        `UPDATE ads SET
        title = ?, 
        description=?, 
        author=?, 
        price=?,
        createdAt=?,
        image=?, 
        city=? 
        WHERE id = ?` 
    );
        stmt.run([
            req.body.title,
            req.body.description,
            req.body.author,
            req.body.price,
            req.body.createdAt,
            req.body.image,
            req.body.city,
            id
        ], (err) => {
            if (err) {
              res.status(500).send(err)
            } else {
              res.send('Ad has been updated')
            }
          })
     });




// app.delete("/ads/:id", (req, res) => {
//     console.log(req.params.id);

//     ads = ads.filter((ad) => {
//        return ad.id !== Number.parseInt(req.params.id);
//     });
//     res.send("The ad was deleted");

// });


// app.put("/ads/:id", (req, res) => {
//     console.log(req.params.id);
//     console.log(req.body);
//     //array.map
//     ads = ads.map((ad) => {
//         if(Number.parseInt(req.params.id) === ad.id) {
//             return req.body;
//         } else {
//             return ad;
//         }
//     });
//     res.send('ok');
// });


app.listen(port, async () => { //démarre Express sur le port défini (ici 3000)
    console.log(`Example app listening on port ${port}`);
    await dataSource.initialize(); // à la lecture du port, initialise la base de données
})

