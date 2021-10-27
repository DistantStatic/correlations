//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Correlations is ERC721, Ownable {

    mapping(address=>uint[]) collections;
    struct Token {
        uint8 id;
    }
    Token[] mintedTokens;
    string baseUri;
    uint maxSupply;

    constructor() ERC721("CORE", "Correlations") Ownable() {
        maxSupply = 50;
    }

    function setBaseUri(string memory _newUri) public onlyOwner {
        baseUri = _newUri;
    }

    function mintToken() public payable returns(uint){
        require(msg.value == (0.1 ether), 'Please send 0.1 ether');
        require((mintedTokens.length) < maxSupply, 'Token Limit Reached');

        uint8 tokenId = uint8(mintedTokens.length + 1);
        _safeMint(msg.sender, tokenId);
        collections[msg.sender].push(tokenId);
        mintedTokens.push(Token(tokenId));

        return tokenId;
    }

    function mintTokenMulti() public payable returns(uint8[] memory){
        require(msg.value == (0.5 ether), 'Please send 0.5 ether for Multi Mint');
        require((mintedTokens.length + 4) < maxSupply, 'Token Limit Reached or Not Enough Available');

        uint8 startingTokenId = uint8(mintedTokens.length + 1);
        uint8[] memory tokenIds = new uint8[](5);
        for(uint i = 0; i < tokenIds.length; i++){
            uint tokenId = startingTokenId + i;
            _safeMint(msg.sender, tokenId);
            mintedTokens.push(Token(uint8(tokenId)));
            collections[msg.sender].push(tokenId);
            tokenIds[i] = uint8(tokenId);
        }
        return tokenIds;
    }

    function getCollection() public view returns(uint[] memory){
        return collections[msg.sender];
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
    

    receive() external payable {}

}