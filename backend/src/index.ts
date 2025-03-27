import 'reflect-metadata';
import express from "express"
import dataSource from "./config/db";
import { Ad } from "./entities/Ad"; 
import { Category } from './entities/Category';
import { Tag } from './entities/Tag';
import cors from "cors";


const port =3000;
const app = express();

app.use(cors());
app.use(express.json());

//Request Handler
//req : requete, res : response (le _req pour dire à typescript que l'on sait que l'on doit préciser le request)
app.get("/ads", async (req, res) => {

  const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : null;
  console.log(categoryId);

  const adId = req.query.adId?parseInt(req.query.adId as string) : null;
  console.log(adId);

  try {
    let ads;

    if (categoryId) {
      ads = await Ad.find({
        where: { 
          category: { id: categoryId 
          } 
        },
        relations: { 
          category: true 
        }, 
      });
    } else if (adId) {
      ads = await Ad.findOneBy({
        id: adId,
    })

    } else {
      ads = await Ad.find();  
    } 
    res.json(ads);

  } catch (error) {
      console.error("❌ Erreur lors de la récupération des annonces:", error);
      res.status(500).json({ error: "Erreur de récupération des annonces" });
  }
});


app.get("/categories", async (_req, res) => {
  try {
      const categories = await Category.find();  
      console.log(categories);  
      res.json(categories);  
  } catch (error) {
      console.error("❌ Erreur lors de la récupération des categories:", error);
      res.status(500).json({ error: "Erreur de récupération des categories" });
  }
});


app.get("/tags", async (req, res) => {
  const tags = await Tag.find();
  console.log(tags);
  res.json(tags);
})


app.post("/ads", async (req, res) => {
  const { title, description, author, price, createdAt, image, city, categoryId, tags } = req.body;  
   
  try {
      const ad = new Ad();
      ad.title = title;
      ad.description = description;
      ad.author = author;
      ad.price = price;  
      ad.createdAt = createdAt;  
      ad.image = image; 
      ad.city = city; 
      ad.category = categoryId;
      ad.tags = tags

      console.log(categoryId);

      await ad.save(); 
      res.status(201).send('ad has been created !');

    } catch (error) {
      console.error("❌ Erreur lors de la création de l'annonce:", error);
      res.status(500).json({ error: "Erreur de création de l'annonce" });
  }
});




// app.post("/categories", async (req, res) => {
//   const categoriesData = req.body;

//   try {
//     categoriesData.map((categoryData:Category) => {
//       if (!categoryData.categoryName) {
//         throw new Error("Each category must have a categoryName");
//       }
//       console.log(`Creating category: ${categoryData.categoryName}`);
  
//       const category = new Category();
//       category.categoryName = categoryData.categoryName;
  
//       category.save();
//     });
//     res.send('categories créées avec succès.')
  
//   } catch (error){
//     res.status(500).send(error);
//   }
  
// });

app.post("/categories", async (req, res) => {
  try {
    const { categoryName } = req.body;

    const category = new Category();
    category.categoryName = categoryName;

    await category.save(); 

    res.status(201).send('catgegory has been created !');

  } catch (err){
    console.log("err", err);
    res.status(500).send(err);
  }

});






app.post("/tags", async (req, res) => {
  const tag = new Tag();

  tag.tagName = req.body.tagName;

  await tag.save(); 
      res.status(201).send('tag has been created !');
})

  



//:id les deux points indiquent que c'est un paramètre de route
app.delete("/ads/:id", async (req, res) => {
    const id = Number.parseInt(req.params.id);
    try {
      await Ad.delete({id: id});
      res.send('Ad has been deleted');
    }
    catch (err){
      console.log("err", err);
      res.status(500).send(err);
    }
  
});


app.delete("/categories/:id", async (req, res) => {
  const id = Number.parseInt(req.params.id);
  try {
    await Category.delete({id: id});
    res.send('Category has been deleted');
  }
  catch (err){
    console.log("err", err);
    res.status(500).send(err);
  }

});



app.put("/ads/:id", async (req, res) => {
    const id = Number.parseInt(req.params.id);
    try {
    //fonction update native permettant de modifier partiellement l'entité en base. (par exemple dans ma route put, je ne lui passe qu'un titre à la modif.)
    await Ad.update({id:id}, req.body);
    res.send("Ad has been updated !");
    } catch (error) {
      console.log("error", error);
      res.status(500).send(error);
    }
});



app.put("/categories/:id", async (req, res) => {
    const id = Number.parseInt(req.params.id);
    try {
    //fonction update native permettant de modifier partiellement l'entité en base. (par exemple dans ma route put, je ne lui passe qu'un titre à la modif.)
    await Category.update({id:id}, req.body);
    res.send("Category has been updated !");
    } catch (error) {
      console.log("error", error);
      res.status(500).send(error);
    }
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


app.listen(port, async () => { 
  console.log(`Example app listening on port ${port}`);

  try {
    await dataSource.initialize();
    console.log("Database connected successfully!");
} catch (error) {
    console.error("Database connection failed:", error);
}
});


