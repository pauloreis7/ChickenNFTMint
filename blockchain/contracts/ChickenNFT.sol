// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import {Base64} from "./libraries/Base64.sol";

contract ChickenNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string svgPartOne =
        "<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 223 223' fill='none'><rect width='100%' height='100%' fill='";

    string svgPartTwo =
        "'/><path d='M111.758 24.3491V33.6982H116.555H121.352V38.3728V43.0474H116.555H111.758V57.0711V71.0948H97.3656H82.9735V66.4202V61.7456H73.3788H63.7841V57.0711V52.3965H54.1894H44.5947V57.0711V61.7456H39.7974H35V75.7693V89.793H39.7974H44.5947V94.4676V99.1422H39.7974H35V108.491V117.84H39.7974H44.5947V122.515V127.19H49.3921H54.1894V131.864V136.539H58.9868H63.7841V141.213V145.888H73.3788H82.9735V155.237V164.586H87.7709H92.5682V169.261V173.935H116.555H140.542V169.261V164.586H145.339H150.136V155.237V145.888H159.731H169.326V141.213V136.539H174.123H178.921V131.864V127.19H183.718H188.515V108.491V89.793H183.718H178.921V80.4439V71.0948H183.718H188.515V66.4202V61.7456H183.718H178.921V52.3965V43.0474H174.123H169.326V38.3728V33.6982H164.529H159.731V29.0236V24.3491H154.934H150.136V19.6745V14.9999H130.947H111.758V24.3491ZM169.326 52.3965V61.7456H174.123H178.921V66.4202V71.0948H169.326H159.731V75.7693V80.4439H164.529H169.326V85.1185V89.793H174.123H178.921V108.491V127.19H169.326H159.731V131.864V136.539H150.136H140.542V141.213V145.888H126.15H111.758V141.213V136.539H106.96H102.163V131.864V127.19H111.758H121.352V122.515V117.84H102.163H82.9735V113.166V108.491H87.7709H92.5682V103.817V99.1422H82.9735H73.3788V113.166V127.19H78.1762H82.9735V131.864V136.539H78.1762H73.3788V131.864V127.19H63.7841H54.1894V117.84V108.491H49.3921H44.5947V103.817V99.1422H54.1894H63.7841V94.4676V89.793H58.9868H54.1894V85.1185V80.4439H49.3921H44.5947V71.0948V61.7456H54.1894H63.7841V66.4202V71.0948H73.3788H82.9735V75.7693V80.4439H97.3656H111.758V75.7693V71.0948H116.555H121.352V57.0711V43.0474H145.339H169.326V52.3965ZM102.163 150.562V155.237H111.758H121.352V159.912V164.586H106.96H92.5682V155.237V145.888H97.3656H102.163V150.562ZM140.542 159.912V164.586H135.744H130.947V159.912V155.237H135.744H140.542V159.912Z' fill='white'/><path d='M140.542 66.4203V80.444H145.339H150.137V66.4203V52.3966H145.339H140.542V66.4203Z' fill='white'/><path d='M121.352 113.166V117.84H126.15H130.947V113.166V108.491H126.15H121.352V113.166Z' fill='white'/><style>.base { fill: white; font-weight: 700; font-size: 24px; }</style><text x='50%' y='90%' class='base' dominant-baseline='middle' text-anchor='middle'>";

    string[] firstWords = ["My ", "A ", "It's ", "Some ", "Just ", "Your "];

    string[] secondWords = [
        "epic ",
        "cute ",
        "rare ",
        "huge ",
        "nice ",
        "pretty "
    ];

    string[] thirdWords = [
        "NFT!",
        "chicken!",
        "JPEG!",
        "token!",
        "pixels!",
        "photo!"
    ];

    string[] colors = ["#151515", "red", "orange", "yellow", "blue", "green"];

    event NewChickenNFTMinted(address sender, uint256 tokenId);

    constructor() ERC721("SquareNFT", "SQUARE") {
        console.log("This is my chicken NFT mint contract!");
    }

    function pickRandomFirstWord(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("FIRST_WORD", Strings.toString(tokenId)))
        );

        rand = rand % firstWords.length;
        return firstWords[rand];
    }

    function pickRandomSecondWord(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("SECOND_WORD", Strings.toString(tokenId)))
        );

        rand = rand % secondWords.length;
        return secondWords[rand];
    }

    function pickRandomThirdWord(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("THIRD_WORD", Strings.toString(tokenId)))
        );

        rand = rand % thirdWords.length;
        return thirdWords[rand];
    }

    function pickRandomColor(uint256 tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("COLOR", Strings.toString(tokenId)))
        );
        rand = rand % colors.length;
        return colors[rand];
    }

    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    function makeAChickenNFT() public {
        uint256 newItemId = _tokenIds.current();

        string memory first = pickRandomFirstWord(newItemId);
        string memory second = pickRandomSecondWord(newItemId);
        string memory third = pickRandomThirdWord(newItemId);
        string memory combinedWord = string(
            abi.encodePacked(first, second, third)
        );

        // Add the random color in.
        string memory randomColor = pickRandomColor(newItemId);
        string memory finalSvg = string(
            abi.encodePacked(
                svgPartOne,
                randomColor,
                svgPartTwo,
                combinedWord,
                "</text></svg>"
            )
        );

        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        combinedWord,
                        '", "description": "A highly acclaimed collection of special chickens.", "image": "data:image/svg+xml;base64,',
                        // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log("\n--------------------");
        console.log(finalTokenUri);
        console.log("--------------------\n");

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, finalTokenUri);

        _tokenIds.increment();
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        emit NewChickenNFTMinted(msg.sender, newItemId);
    }
}
