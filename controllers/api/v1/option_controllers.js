
const Question = require('../../../models/question');
const Option = require('../../../models/option');

/**
 * create a option
 * takes the question id from parameters and text of option from body of request
 * check if quetionsId is valid or not if question id is valid then we create an option
 * assign link to vote dynamicaly and push option id to the question's options array
 */
module.exports.create = (req, res) => {
    // console.log("Question Id", req.params.id);
    // console.log("Option ", req.body.option);

    const questionId = req.params.id;

    // Create a new option with the text from the request body
    Options.create({ text: req.body.option })
        .then((option) => {
        if (option) {
            console.log("Successfully Created Option!!");

            // console.log("option._id: ", option._id);

            //Set the link_to_vote field for the option and save it
            // option.link_to_vote = `http://localhost:8000/api/v1/options/${option._id}/add_vote`;
            option.link_to_vote = `https://poll-system-dh5e.onrender.com/api/v1/options/${option._id}/add_vote`;
            option.save();

            Questions.findById(questionId)
            .then((question) => {
                if (!question) {
                return res.status(404).json({ message: "Question not found" });
                }

                question.options.push(option._id);
                question.save();

                res
                .status(200)
                .json({ message: "Successfully created option!", question });
            })
            .catch((err) => {
                console.log("Error finding question:", err);
                res.status(500).json({ message: "Internal Server Error" });
            });
        }
        })
        .catch((err) => {
        console.log("Error creating option:", err);
        res.status(500).json({ message: "Internal Server Error" });
    });
};

/**
 * delete the option 
 * takes option id from parameters
 * check if option id is valid or not if it is valid
 * first remove option's id from question's options array
 * then delete the option from db
 */
module.exports.delete = async function (req, res) {

    try {


        const optionId = req.params.id;

        if (!optionId) {
            return res.status(404).json({
                message: 'Empty option id recieved',
                status: 'failure',
                data: []
            });
        };

        const option = await Option.findById(optionId);

        if (!option) {
            return res.status(404).json({
                message: 'Invalid option id recieved',
                status: 'failure',
                data: []
            });
        };

        await Question.findByIdAndUpdate(option.question_id, { $pull: { 'options': option.id } });
        await Option.findByIdAndDelete(optionId);

        return res.status(200).json({
            message: 'Option deleted',
            status: 'successful',
            data: []
        });

    } catch (error) {
        console.log('DELETE OPTION ERROR: ', error);

        return res.status(500).json({
            message: 'Internal Server Error',
            status: 'failure',
            data: []
        })
    }

}



/**
 * add vote to the option
 * takes option id from parameters of request
 * check if option id is valid or not if valid increate votes by 1
 * and return option object
 */
module.exports.addVote = async function (req, res) {

    try {
        const optionId = req.params.id;

        if (!optionId) {
            return res.status(404).json({
                message: 'Empty option id recieved',
                status: 'failure',
                data: []
            });
        };

        const option = await Option.findById(optionId);

        if (!option) {
            return res.status(404).json({
                message: 'Invalid option id recieved',
                status: 'failure',
                data: []
            });
        };

        option.votes++;
        await option.save();

        return res.status(200).json({
            message: 'vote Increamented',
            status: 'successful',
            data: [option]
        })

    } catch (error) {
        console.log('ADD VOTE TO OPTION ERROR: ', error);

        return res.status(500).json({
            message: 'Internal Server Error',
            status: 'failure',
            data: []
        })
    }



}
