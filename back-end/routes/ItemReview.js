const app = require('express');
const router = app.Router();
const {getItemReview, createItemReview} = require ('../controllers/itemReviewController')

/**************************************************************************************************/
/* Available Routes                                                                               */
/**************************************************************************************************/

/**************************************************************************************************/
/**
 * \brief  GET method
 * \param  req  Request data
 * \param  res  Response data
 */
router.get('/', async (req, res) => {
  try {
    const itemReview = await getItemReview (req.query?.placa);
    res.json(itemReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**************************************************************************************************/
/**
 * \brief  POST method
 * \param  req  Request data
 * \param  res  Response data
 */
router.post('/', async (req, res) => {
  try {
    const ok = await createItemReview (req.body, req.query?.placa);
    if (ok) {
        res.status(200);
    } else {
        res.status(500).json({ error: "Error creating maintenance" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**************************************************************************************************/
/* Export modules                                                                                 */
/**************************************************************************************************/
module.exports = {router};
