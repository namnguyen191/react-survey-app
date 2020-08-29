import requireLogin from '../middlewares/requireLogin.js';
import requireCredits from '../middlewares/requireCredits.js';
import Survey from '../models/Survey.js';
import sendMail from '../services/Mailer.js';
import surveyTemplate from '../services/emailTemplates/surveyTemplate.js';

const surveyRoutes = (app) => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        // Retrieve the survey info from the request body
        const { title, subject, body, recipients } = req.body;

        // Create the Survey
        const recipientsArray = recipients.split(',').map(email => ({email}));
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: [{email: "hoangnamcanada191@gmail.com"}],
            _user: req.user.id,
            dateSent: Date.now()
        });

        // Using mailer to send the email
        try {
            const { subject, recipients } = survey;
            console.log('Recipients: ', recipients[0]);
            console.log('Subject: ', subject);
            await sendMail(survey, surveyTemplate(survey));
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};

export default surveyRoutes;
