// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Chainlogue is ERC20, Ownable {
    using SafeMath for uint256;

    struct Post {
        uint256 id;
        address author;
        string content;
        uint256 tipAmount;
        uint256 repostCount;
        uint256 likeCount;
    }

    struct Repost {
        uint256 postId;
        address reposter;
    }
 
    struct Like {
        uint256 postId;
        address liker;
    }

    Post[] public posts;
    Repost[] public reposts;
    Like[] public likes;
    uint256 public postCount;
    uint256 public repostCount;
    uint256 public likeCount;

    mapping(address => uint256) public userPostCount;
    mapping(address => mapping(uint256 => bool)) public userTippedPosts;
    mapping(address => mapping(uint256 => bool)) public userRepostedPosts;
    mapping(address => mapping(uint256 => bool)) public userLikedPosts;

    event PostCreated(uint256 postId, address author, string content);
    event PostTipped(uint256 postId, address sender, uint256 amount);
    event PostReposted(uint256 postId, address reposter);
    event PostLiked(uint256 postId, address liker);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function createPost(string memory _content) external {
        require(bytes(_content).length > 0, "Post content cannot be empty");

        postCount++;
        userPostCount[msg.sender]++;
        posts.push(Post(postCount, msg.sender, _content, 0, 0, 0));
        emit PostCreated(postCount, msg.sender, _content);
    }

    function tipPost(uint256 _postId, uint256 _amount) external {
        require(_postId > 0 && _postId <= postCount, "Invalid post ID");
        require(
            !userTippedPosts[msg.sender][_postId],
            "You have already tipped this post"
        );
        require(_amount > 0, "Tipping amount must be greater than 0");

        address payable postAuthor = payable(posts[_postId - 1].author);
        postAuthor.transfer(_amount);

        posts[_postId - 1].tipAmount = posts[_postId - 1].tipAmount.add(
            _amount
        );
        userTippedPosts[msg.sender][_postId] = true;
        emit PostTipped(_postId, msg.sender, _amount);
    }

    function repost(uint256 _postId) external {
        require(_postId > 0 && _postId <= postCount, "Invalid post ID");
        require(
            !userRepostedPosts[msg.sender][_postId],
            "You have already reposted this post"
        );

        repostCount++;
        reposts.push(Repost(_postId, msg.sender));
        posts[_postId - 1].repostCount++;

        userRepostedPosts[msg.sender][_postId] = true;
        emit PostReposted(_postId, msg.sender);
    }

    function likePost(uint256 _postId) external {
        require(_postId > 0 && _postId <= postCount, "Invalid post ID");
        require(
            !userLikedPosts[msg.sender][_postId],
            "You have already liked this post"
        );

        likeCount++;
        likes.push(Like(_postId, msg.sender));
        posts[_postId - 1].likeCount++;

        userLikedPosts[msg.sender][_postId] = true;
        emit PostLiked(_postId, msg.sender);
    }

    function getAccountBalance(
        address account
    ) external view returns (uint256) {
        return balanceOf(account);
    }

    function withdrawTips() external {
        uint256 userTips = 0;

        for (uint256 i = 0; i < posts.length; i++) {
            if (posts[i].author == msg.sender) {
                userTips = userTips.add(posts[i].tipAmount);
                posts[i].tipAmount = 0; // Reset the tip amount
            }
        }

        require(userTips > 0, "No tips to withdraw");

        // Transfer the tips to the user
        payable(msg.sender).transfer(userTips);
    }
}
