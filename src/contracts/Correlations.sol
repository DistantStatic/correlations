//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Correlations is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenCount;
    string baseUri;
    uint maxSupply;
    bool sale;

    constructor() ERC721("CORE", "Correlations") Ownable() {
        maxSupply = 50;
    }

    function setBaseUri(string memory _newUri) public onlyOwner {
        baseUri = _newUri;
    }

    function saleSwitch() public onlyOwner {
        sale = !sale;
    }

    modifier forSale() {
        require(sale, "Currently not minting");
        _;
    }

    function mintToken() public payable forSale returns(uint){
        require(msg.value == (0.1 ether), 'Please send 0.1 ether');
        require(_tokenCount.current() < maxSupply, 'Token Limit Reached');

        _tokenCount.increment();

        uint tokenId = _tokenCount.current();
        _safeMint(msg.sender, tokenId);

        return tokenId;
    }

    function mintTokenMulti() public payable forSale returns(uint[] memory){
        require(msg.value == (0.5 ether), 'Please send 0.5 ether for Multi Mint');
        require((_tokenCount.current() + 4) < maxSupply, 'Token Limit Reached or Not Enough Available');
        _tokenCount.increment();

        uint startingTokenId = _tokenCount.current();
        uint[] memory tokenIds = new uint[](5);
        for(uint i = 0; i < tokenIds.length; i++){
            uint tokenId = startingTokenId + i;
            _safeMint(msg.sender, tokenId);
            tokenIds[i] = tokenId;
            _tokenCount.increment();
        }
        return tokenIds;
    }

    function getCollection(address _address) public view returns(uint[] memory){
        uint count = balanceOf(_address); //6
        uint[] memory ownedTokens = new uint[](count); // [0:0, 1:0, 2:0, 3:0, 4:0, 5:0]
        uint found = 0;
        for (uint i = 1; i < _tokenCount.current(); i++){
            if(ownerOf(i) == _address){
                ownedTokens[found] = i;
                found++;
            }
        }
        return ownedTokens;
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
    
    //for donations etc...
    receive() external payable {}

}