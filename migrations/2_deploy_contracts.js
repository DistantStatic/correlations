const Correlations = artifacts.require('Correlations');

module.exports = function(deployer) {
    deployer.deploy(Correlations);
}
