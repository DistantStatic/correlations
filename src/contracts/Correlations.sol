pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Correlations is ERC721, Ownable {

    string baseUri;

    constructor() ERC721("CORE", "Correlations") Ownable() {
        baseUri = 'localhost:3001';
        
    }

    function setBaseUri(string memory _newUri) public onlyOwner {
        baseUri = _newUri;
    }

}