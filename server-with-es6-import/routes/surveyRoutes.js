import { URL } from 'url';
import Path from 'path-parser';

import requireLogin from '../middlewares/requireLogin.js';
import requireCredits from '../middlewares/requireCredits.js';
import Survey from '../models/Survey.js';
import sendMail from '../services/Mailer.js';
import surveyTemplate from '../services/emailTemplates/surveyTemplate.js';

const surveyRoutes = (app) => {
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        // Retrieve the survey info from the request body
        const { title, subject, body, recipients } = req.body;

        // Create the Survey
        const recipientsArray = recipients
            .split(',')
            .map((email) => ({ email }));
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipientsArray,
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

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({
            _user: req.user.id
        }).select({
            recipients: false
        });

        res.send(surveys);
    });

    // Doesn't need async cause Sengrid doesn't need any real response
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        const events = req.body.map((event) => {
            const match = p.test(new URL(event.url).pathname);
            if (match) {
                return {
                    email: event.email,
                    surveyId: match.surveyId,
                    choice: match.choice
                };
            }
        });
        // Remove null or undefine from arrays
        let cleanEvents = events.filter((el) => el != null);
        // Remove duplicate entry
        cleanEvents.filter(
            (v, i, a) =>
                a.findIndex(
                    (t) => t.email === v.email && t.surveyId === v.surveyId
                ) === i
        );

        // Execute Query to update DB record
        cleanEvents.forEach(({ surveyId, email, choice }) => {
            Survey.updateOne(
                {
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false }
                    }
                },
                {
                    $inc: { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }
            ).exec();
        });

        res.send({});
    });
};

export default surveyRoutes;
