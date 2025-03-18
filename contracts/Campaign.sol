// SPDX-License-Identifier: Unlicensed


pragma solidity >0.7.0 <=0.9.0;

//push new campaign 
contract CampaignFactory {
    address[] public deployedCampaigns;

    event campaignCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address CampaignAddress,
        string imgURL,
        uint indexed timestamp,
        string indexed category
    );

    function createCampaign(
        string memory campaignTitle,
        uint requairedCampaignAmount,
        string memory  imgURL,
        string memory category,
        string memory storyURL
    ) public 
    {
        Campaign newCampaign = new Campaign(
            campaignTitle, requairedCampaignAmount, imgURL,storyURL);
        deployedCampaigns.push (address(newCampaign));

        emit campaignCreated(
            campaignTitle, 
            requairedCampaignAmount,
            msg.sender, 
            address(newCampaign),
            imgURL,
            block.timestamp,
            category
        );
}
}

contract Campaign{
    string public title;
    uint public requiredAmount;
    string public image;
    string public story; 
    address payable public  owner;
    uint public receivedAmount;
    event donated(address indexed donar, uint indexed amount, uint indexed timestamp);
    constructor(
        string memory campaignTitle,
        uint requiredCampaignAmount,
        string memory imgURL,
        string memory storyURL
    ){
        
        title = campaignTitle;
        requiredAmount = requiredCampaignAmount;
        image = imgURL;
        story = storyURL;
        owner = payable(msg.sender);
    }

    function donate() public payable {
        require(requiredAmount > receivedAmount,"requiredAmount fullfiled");
        owner.transfer(msg.value);
        receivedAmount += msg.value;
        emit donated(msg.sender,msg.value, block.timestamp);
    }
}