const fs = require('fs');

let [deploymentType] = process.argv.slice(2);

const REPO = 'cleargdpr';
const QUORUM_VERSION = '0.0.1';

const VERSION = process.env.VERSION || 'latest';

const KUBE_CLUSTER = process.env.KUBE_CLUSTER;
const KOPS_STATE_STORE = process.env.KOPS_STATE_STORE;
const KUBE_NS = 'open-gdpr-dev';

const QUORUM_IMAGE = 'quroum';
const KUBE_QUORUM_DEPLOYMENT = 'open-gdpr-quorum-dev';
const KUBE_CONSTELLATION1_CONTAINER = 'constellation1';
const KUBE_CONSTELLATION2_CONTAINER = 'constellation2';
const KUBE_GETH1_CONTAINER = 'geth1';
const KUBE_GETH2_CONTAINER = 'geth2';

const CG_IMAGE = 'cg';
const KUBE_CONTROLLER_DEPLOYMENT = 'open-gdpr-og-dev';
const KUBE_CONTROLLER_CONTAINER = 'open-gdpr-og-dev';
const KUBE_PROCESSOR_DEPLOYMENT = 'open-gdpr-og-processor-dev';
const KUBE_PROCESSOR_CONTAINER = 'open-gdpr-og-processor-dev';

const API_IMAGE = 'demo-api';
const KUBE_API_DEPLOYMENT = 'open-gdpr-api-dev';
const KUBE_API_CONTAINER = 'open-gdpr-api-dev';

const FRONTEND_IMAGE = 'demo-frontend';
const KUBE_FRONTEND_DEPLOYMENT = 'open-gdpr-frontend-dev';
const KUBE_FRONTEND_CONTAINER = 'open-gdpr-frontend-dev';

const quorum1Modules = [
  {
    ns: KUBE_NS,
    deployment: KUBE_QUORUM_DEPLOYMENT,
    container: KUBE_CONSTELLATION1_CONTAINER,
    image: `${REPO}/${QUORUM_IMAGE}`,
    tag: QUORUM_VERSION
  },
  {
    ns: KUBE_NS,
    deployment: KUBE_QUORUM_DEPLOYMENT,
    container: KUBE_GETH1_CONTAINER,
    image: `${REPO}/${QUORUM_IMAGE}`,
    tag: QUORUM_VERSION
  }
];

const quorum2Modules = [
  {
    ns: KUBE_NS,
    deployment: KUBE_QUORUM_DEPLOYMENT,
    container: KUBE_CONSTELLATION2_CONTAINER,
    image: `${REPO}/${QUORUM_IMAGE}`,
    tag: QUORUM_VERSION
  },
  {
    ns: KUBE_NS,
    deployment: KUBE_QUORUM_DEPLOYMENT,
    container: KUBE_GETH2_CONTAINER,
    image: `${REPO}/${QUORUM_IMAGE}`,
    tag: QUORUM_VERSION
  }
];

const webModules = [
  {
    ns: KUBE_NS,
    deployment: KUBE_CONTROLLER_DEPLOYMENT,
    container: KUBE_CONTROLLER_CONTAINER,
    image: `${REPO}/${CG_IMAGE}`,
    tag: VERSION
  },
  {
    ns: KUBE_NS,
    deployment: KUBE_PROCESSOR_DEPLOYMENT,
    container: KUBE_PROCESSOR_CONTAINER,
    image: `${REPO}/${CG_IMAGE}`,
    tag: VERSION
  },
  {
    ns: KUBE_NS,
    deployment: KUBE_API_DEPLOYMENT,
    container: KUBE_API_CONTAINER,
    image: `${REPO}/${API_IMAGE}`,
    tag: VERSION
  },
  {
    ns: KUBE_NS,
    deployment: KUBE_FRONTEND_DEPLOYMENT,
    container: KUBE_FRONTEND_CONTAINER,
    image: `${REPO}/${FRONTEND_IMAGE}`,
    tag: VERSION
  }
];

const kubeDef = {
  cluster: KUBE_CLUSTER,
  kops_state_store: KOPS_STATE_STORE
};

switch (deploymentType) {
  case '--quorum1':
    kubeDef.modules = quorum1Modules;
    break;
  case '--quorum2':
    kubeDef.modules = quorum2Modules;
    break;
  case '--web-app':
    kubeDef.modules = webModules;
    break;
  case undefined:
  case null:
    kubeDef.modules = quorum1Modules.concat(webModules).concat();
    break;
}

fs.writeFileSync('kubeDef.json', JSON.stringify(kubeDef));