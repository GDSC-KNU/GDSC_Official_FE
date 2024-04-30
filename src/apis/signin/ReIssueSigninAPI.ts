import { instanceJWT } from '@gdsc/apis/Api_JWT';

import { signUpUserInterface } from '@gdsc/interface/UserInterface';

export const ReIssueSigninAPI = (
  userData: signUpUserInterface
): Promise<signUpUserInterface> => {
  return instanceJWT
    .post('/api/auth/additionalInfo', { userData })
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};
