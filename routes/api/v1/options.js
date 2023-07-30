const express = require('express');
const router = express.Router();

const optionsController = require('../../../controllers/api/v1/option_controllers');
const homeController = require('../../../controllers/api/v1/home_controller');
router.get('/', homeController.homePage);

router.delete('/:id/delete', optionsController.delete); // delete option 
router.get('/:id/add_vote', optionsController.addVote); // add vote to the option



module.exports = router;
