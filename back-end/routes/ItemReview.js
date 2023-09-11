const app = require('express');
const router = app.Router();
const {getItemReview, createItemReview} = require ('../controllers/itemReviewController')


//######## Available Routes

//GET
router.get('/', async (req, res) => {
    try {

        const itemReview = await getItemReview (req.query?.placa)

      res.json(itemReview);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})

//POST
router.post('/', async (req, res) => {
  try {

      const status = await createItemReview (req.body,req.query?.placa)
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = {router};
