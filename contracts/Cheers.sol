
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";


contract Cheers is ERC1155, Ownable, ERC1155Supply {

    uint DEAR_FRENS = 1;

    constructor() ERC1155("https://bafybeiaoyeg2dm6faspowoswo43eabfvbzpexvdgeh2pto3uygw5qk6pd4.ipfs.w3s.link/") {}

    function uri(uint256 _tokenID) override public view returns (string memory) {
      require(exists(_tokenID), "ERC721Metadata: URI query for nonexistent token");
      return string(abi.encodePacked(super.uri(1), Strings.toString(1), ".json"));
    }

    function mint(address account, uint256 id)
        public
        onlyOwner
    {
        _mint(account, id, 1, "");
    }

    function airdrop(address[] memory _addresses, uint tokenId) public onlyOwner {
      for (uint i = 0; i < _addresses.length; i++) {
        mint(_addresses[i], tokenId);
      }
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
