const modalConstants = {
  CENTER: {
    instruction: 'Gira il volto al centro',
  },
  LEFT: {
    instruction: 'Gira il volto a sinistra',
  },
  RIGHT: {
    instruction: 'Gira il volto a destra',
  },
};

const BNL_IOS_STORE_LINK = 'https://apps.apple.com/it/app/bnl/id578969149';
const BNL_ANDROID_STORE_LINK = 'https://play.google.com/store/apps/details?id=it.bnl.apps.banking';
const GENERIC_ERROR_MESSAGE = 'Errore di sistema, si prega di riprovare più tardi';

export class Utils {
  
  public static getInstruction(key: string): string {
    let utterance = new SpeechSynthesisUtterance(modalConstants[key].instruction);
    utterance.rate = 1.5;
    speechSynthesis.speak(utterance);
    return modalConstants[key].instruction;
  }

  public static bnlStore() {
    let ua = navigator.userAgent.toLowerCase();
    window.alert(ua);
    let isAndroid = ua.indexOf('android') > -1;
    let isIphone = ua.indexOf('iphone') > -1;
    if (isIphone) {
      let app = {
        launchApp: function () {
          setTimeout(function () {
            window.location.href = BNL_IOS_STORE_LINK;
          }, 1000);
          window.location.href = BNL_IOS_STORE_LINK;
        },
        openWebApp: function () {
          window.location.href = BNL_IOS_STORE_LINK;
        }
      };
      app.launchApp();
    } else if (isAndroid) {
      let app = {
        launchApp: function () {
          window.location.replace(BNL_ANDROID_STORE_LINK);
          setTimeout(this.openWebApp, 1000);
        },
        openWebApp: function () {
          window.location.href = BNL_ANDROID_STORE_LINK;
        }
      };
      app.launchApp();
    } else {
      window.alert(GENERIC_ERROR_MESSAGE;
    }
  }

}
