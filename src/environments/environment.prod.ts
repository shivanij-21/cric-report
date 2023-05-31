let siteName = 'cricexch';
let domain = 'cricbuzzer.io';
let hostname = window.origin;
let isCaptcha = true;
let isb2c = true
let whatsapp = '+00 00000 00000';
let whatsapp1 = '';
let isTraslate = true

// --------------------------------------------------------------------------


 if (hostname.indexOf('cricbuzzer.io') > -1) {
  siteName = 'cricbuzzer';
}

else if (hostname.indexOf('dreamcric247.com') > -1) {
  siteName = 'dreamcric';
  domain = 'dreamcric247.com;'
}
else if (hostname.indexOf('cricbuzzer.com.bd') > -1) {
  siteName = 'cricbuzzerbd';
} 
 else if (hostname.indexOf('cricexch.net') > -1) {
  siteName = 'cricexch';
}
if (hostname.indexOf('winplus247.com') > -1) {
  siteName = 'winplus247';
}
if (hostname.indexOf('winplus99.com') > -1) {
  siteName = 'winplus99';
  isb2c = false
}
if (hostname.indexOf('lionbook247.com') > -1) {
  siteName = 'lionbook247';
  isb2c = false
  isTraslate = false;

}
if (hostname.indexOf('tripbets.io') > -1) {
  siteName = 'tripbets';
  isb2c = false;
  isTraslate = false;

}


// marketing site end


export const environment = {
  production: true,
  apisUrl: "https://access.streamingtv.fun:3445/api/all_apis",
  siteName: siteName,
  isCaptcha: isCaptcha,
  whatsapp: whatsapp,
  whatsapp1: whatsapp1,
  isIcasino: false,
  domain:domain,
  isb2c:isb2c,
  isTraslate:isTraslate
};
