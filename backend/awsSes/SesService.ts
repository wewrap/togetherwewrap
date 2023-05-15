import { type User } from '@prisma/client';
import AWS from 'aws-sdk'

AWS.config.update({ region: 'us-west-1' });
export default class SesService {
  public static async sendMail(planLeader: User, url: string, email: string, message: string) {
    const baseURL = 'http://localhost:3000'
    const planLeaderFullName = `${planLeader.firstName} ${planLeader.lastName}`
    const params = {
      Destination: {
        ToAddresses: [
          `${email}`
        ]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `<h3>
            Hello, ${email}! You have been invited to join ${planLeaderFullName}'s super secret plan 🤫 !
            </h3>
            <h3>
            ${planLeaderFullName} said: ${message}
            </h3>
            <button>
              <a href=${baseURL}${url}>
                Join Plan
              </a>
            </button>
            `
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `${planLeaderFullName} has sent you an invite to a Wewrap plan!`
        }
      },
      Source: 'kevinvong0129@gmail.com',
      ReplyToAddresses: [
        'kevinvong0129@gmail.com'
      ]
    };

    const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

    sendPromise.then(
      function (data) {
        console.log(data.MessageId);
      }).catch(
      function (err) {
        console.error(err, err.stack);
      });
  }
}
