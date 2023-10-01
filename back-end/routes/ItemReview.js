const app = require('express');
const router = app.Router();
const {getItemReview, createItemReview} = require ('../controllers/itemReviewController')
const { requireAuthentication } = require('../src/authentication.js')


/**************************************************************************************************/
/* Available Routes                                                                               */
/**************************************************************************************************/

/**************************************************************************************************/
/**
 * \brief  GET method for a specific vehicle
 * \param  req  Request data
 * \param  res  Response data
 */
router.get('/:licensePlate', requireAuthentication, async (req, res) => {
  try {
    const itemReview = await getItemReview(req.params.licensePlate);
    res.json(itemReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**************************************************************************************************/
/**
 * \brief  GET method for all maintenances
 * \param  req  Request data
 * \param  res  Response data
 */
router.get('/', requireAuthentication, async (req, res) => {
  try {
    const itemReview = await getItemReview();
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
router.post('/', requireAuthentication, async (req, res) => {
  try {
    const ok = await createItemReview(req.body);
    if (ok) {
        res.json(req.body);
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
