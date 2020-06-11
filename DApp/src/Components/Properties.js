export const Properties = {


  ABI_VALUE :[
    {
      "constant": true,
      "inputs": [],
      "name": "authenticateUser",
      "outputs": [
        {
          "name": "entitiesAddress",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "entityDrrMap",
      "outputs": [
        {
          "name": "identity",
          "type": "address"
        },
        {
          "name": "isValue",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "appDrrMap",
      "outputs": [
        {
          "name": "identity",
          "type": "address"
        },
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "isValue",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newUser",
          "type": "address"
        },
        {
          "name": "identity",
          "type": "address"
        }
      ],
      "name": "addUserToEntity",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "appName",
          "type": "string"
        },
        {
          "name": "versionId",
          "type": "string"
        },
        {
          "name": "url",
          "type": "string"
        },
        {
          "name": "apis",
          "type": "string"
        }
      ],
      "name": "addAppVersion",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "entity",
          "type": "address"
        }
      ],
      "name": "getEntityDetails",
      "outputs": [
        {
          "name": "entityName",
          "type": "string"
        },
        {
          "name": "owners",
          "type": "address[]"
        },
        {
          "name": "users",
          "type": "address[]"
        },
        {
          "name": "apps",
          "type": "address[]"
        },
        {
          "name": "apis",
          "type": "address[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "identity",
          "type": "address"
        },
        {
          "name": "entityName",
          "type": "string"
        }
      ],
      "name": "registerEntity",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "apiDrrMap",
      "outputs": [
        {
          "name": "identity",
          "type": "address"
        },
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "isValue",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "userName",
          "type": "string"
        }
      ],
      "name": "isUserNameUnique",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "user",
          "type": "address"
        },
        {
          "name": "identity",
          "type": "address"
        }
      ],
      "name": "removeUserFromEntity",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "entityName",
          "type": "string"
        }
      ],
      "name": "isEntityNameUnique",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "appIdentity",
          "type": "address"
        },
        {
          "name": "appName",
          "type": "string"
        },
        {
          "name": "entityName",
          "type": "string"
        },
        {
          "name": "appVersion",
          "type": "string"
        },
        {
          "name": "url",
          "type": "string"
        },
        {
          "name": "apis",
          "type": "string"
        }
      ],
      "name": "registerApp",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "userDrrMap",
      "outputs": [
        {
          "name": "identity",
          "type": "address"
        },
        {
          "name": "publicKey",
          "type": "string"
        },
        {
          "name": "url",
          "type": "string"
        },
        {
          "name": "isValue",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "apiName",
          "type": "string"
        }
      ],
      "name": "searchApi",
      "outputs": [
        {
          "name": "serializedVersion",
          "type": "bytes"
        },
        {
          "name": "serializedUrl",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "name": "appEnsMap",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newUser",
          "type": "address"
        }
      ],
      "name": "isUserAlreadyRegistered",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "appName",
          "type": "string"
        }
      ],
      "name": "isAppNameUnique",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "name": "apiEnsMap",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "userIdentifier",
          "type": "address"
        }
      ],
      "name": "getUser",
      "outputs": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "url",
          "type": "string"
        },
        {
          "name": "publicKey",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getUser",
      "outputs": [
        {
          "name": "url",
          "type": "string"
        },
        {
          "name": "publicKey",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "isUserRegistered",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "apiIdentity",
          "type": "address"
        },
        {
          "name": "apiName",
          "type": "string"
        },
        {
          "name": "entityName",
          "type": "string"
        },
        {
          "name": "apiVersion",
          "type": "string"
        },
        {
          "name": "url",
          "type": "string"
        }
      ],
      "name": "registerApi",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "apiName",
          "type": "string"
        }
      ],
      "name": "isApiNameUnique",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "userName",
          "type": "string"
        }
      ],
      "name": "searchUser",
      "outputs": [
        {
          "name": "serializedUrl",
          "type": "bytes"
        },
        {
          "name": "serializedPublicKey",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "string1",
          "type": "string"
        },
        {
          "name": "string2",
          "type": "string"
        }
      ],
      "name": "compareStrings",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "entityName",
          "type": "string"
        }
      ],
      "name": "getUsers",
      "outputs": [
        {
          "name": "serializedUsers",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "appName",
          "type": "string"
        }
      ],
      "name": "searchApp",
      "outputs": [
        {
          "name": "serializedVersion",
          "type": "bytes"
        },
        {
          "name": "serializedUrl",
          "type": "bytes"
        },
        {
          "name": "serializedApis",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "url",
          "type": "string"
        },
        {
          "name": "publicKey",
          "type": "string"
        },
        {
          "name": "userName",
          "type": "string"
        }
      ],
      "name": "registerUser",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "name": "entityEnsMap",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "url",
          "type": "string"
        },
        {
          "name": "publicKey",
          "type": "string"
        }
      ],
      "name": "updateUser",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "apiName",
          "type": "string"
        }
      ],
      "name": "isApiExist",
      "outputs": [
        {
          "name": "serialized",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "entityName",
          "type": "string"
        }
      ],
      "name": "getApps",
      "outputs": [
        {
          "name": "serializedApps",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "entityName",
          "type": "string"
        }
      ],
      "name": "getApis",
      "outputs": [
        {
          "name": "serializedApis",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "apiName",
          "type": "string"
        },
        {
          "name": "versionId",
          "type": "string"
        },
        {
          "name": "url",
          "type": "string"
        }
      ],
      "name": "addApiVersion",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "name": "userEnsMap",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "value",
          "type": "bool"
        }
      ],
      "name": "IsExist",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "value",
          "type": "bool"
        }
      ],
      "name": "IsExistEntity",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "value",
          "type": "bool"
        }
      ],
      "name": "IsExistUser",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "value",
          "type": "bool"
        }
      ],
      "name": "IsExistAppName",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "value",
          "type": "bool"
        }
      ],
      "name": "IsExistApiName",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "value",
          "type": "bool"
        }
      ],
      "name": "IsUserRegistered",
      "type": "event"
    }
  ],
ADDRESS : '0x4eb7b800fce24a3fff651d1fadbb9a278c4590d9'
};
