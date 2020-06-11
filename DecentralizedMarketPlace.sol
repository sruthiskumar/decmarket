pragma solidity ^0.5.8;
pragma experimental ABIEncoderV2;

contract DecentralizedMarketPlace {

    /**
     * @dev Structure to define an Entity.
     * 
     * @param identity The Entity identifier.
     * @param owners List of address of owners of the entity.
     * @param users List of address of users of the entity. 
     * @param apps List of address of application which is owned by the entity.
     * @param apis List of address of api which is owned by the entity.
     * @param isValue boolean variable to check if entity is already registered.
     */
    struct EntityDRR {
        address identity;
        address[] owners;
        address[] users;
        address[] apps;
        address[] apis;
        bool isValue;   
    }
    
    /**
     * @dev Structure to define a User.
     * 
     * @param identity The user identifier.
     * @param publickey The communication key(public key) to connect to users server.
     * @param url User's server url.
     * @param isValue boolean variable to check if user is already registered.
     */
    struct UserDRR {
        address identity;
        string publicKey;
        string url;
        bool isValue;
    }
    
    /**
     * @dev Structure to define application version.
     * 
     * @param id The version identifier.
     * @param url The url where the app is hosted.
     * @param api The comma seperated list of apis implemented by the application.
     */ 
    struct AppVersion {
        string id;
        string url;
        string api;
    }

    /** 
     * @dev Structure to define application.
     * 
     * @param identity The application identifier.
     * @param owner The identifier of user who registerd the application.
     * @param isValue boolean variable to check if application is already registered.
     * @param versions The list of application versions.
     */
    struct AppDRR {
        address identity;
        address owner;
        bool isValue;
        AppVersion[] versions;
    }
    
    /**
     * @dev Structure to define API version.
     * 
     * @param id The version identifier.
     * @param url The url where the api is hosted.
     */ 
    struct ApiVersion {
        string id;
        string url;
    }

    /**
     * @dev Structure to define an API.
     * 
     * @param identifier The API identifier.
     * @param owner The identifier of user who registerd the API.
     * @param isValue isValue boolean variable to check if API is already registered.
     * @param versions The list of API versions.
     */     
    struct ApiDRR {
        address identity;
        address owner;
        bool isValue;
        ApiVersion[] versions;
    }
    
    //Mapping entity identifier to EntityDRR
    mapping (address => EntityDRR) public entityDrrMap;
    
    //Mapping user identifier to UserDRR
    mapping (address => UserDRR) public userDrrMap;
    
    //Mapping application identifier to AppDRR
    mapping (address => AppDRR) public appDrrMap;
    
    //Mapping API identifier to ApiDRRDRR
    mapping (address => ApiDRR) public apiDrrMap;
    
    //Mapping entity name to entity identifier
    mapping (string => address) public entityEnsMap;
    
    //Mapping user name to user identifier
    mapping (string => address) public userEnsMap; 
    
    //Mapping application name to application identifier
    mapping (string => address) public appEnsMap;
    
    //Mapping API name to API identifier
    mapping (string => address) public apiEnsMap;

    //List of all registered entity names.
    string[] entityNames;    
    
    //List of all registered user names.
    string[] userNames;
    
    //List of all registered application names.
    string[] appNames;
    
    //List of all registered API names.
    string[] apiNames; 

    //List of all entity addresses.
    address[] entityKeys;

    //Events for Checking return values.
    event IsExist(bool value);
    event IsExistEntity(bool value);
    event IsExistUser(bool value);
    event IsExistAppName(bool value);
    event IsExistApiName(bool value);
    event IsUserRegistered(bool value);

    /**
     * @dev Method to register user in DecentralizedMarketPlace.
     * 
     * @param url The URL of users server
     * @param publicKey The communication key(public key) to connect to users server.
     * @param userName The unique username.
     */     
    function registerUser(string memory url, string memory publicKey, string memory userName) public {
        bool flag = false;
        
        //check if user is already registered
        if(userDrrMap[msg.sender].isValue != true) {
            UserDRR storage user = userDrrMap[msg.sender];
            user.url = url;
            user.publicKey = publicKey;
            user.identity = msg.sender;
            user.isValue = true;
           
            //Registering user name
            userEnsMap[userName] = msg.sender;
            userNames.push(userName);
            flag = true;
        }
        else {
            flag = false;
        }
        emit IsExistUser(flag);
    }

    /**
     * @dev Method To check if a user name is unique. 
     * 
     * @param userName The name to be checked for uniqueness.
     */ 
    function isUserNameUnique(string memory userName) public {
        bool flag = true;
        for(uint i = 0; i < userNames.length; i++) {
            if(compareStrings(userNames[i], userName)) {
                flag = false;
            }
        }
        emit IsExist(flag);
    }

    /**
     * @dev Method to update user details in the system.
     * 
     * @param url The user url.
     * @param publicKey The user communication key.
     * 
     * @return true if its successfully updated.
     */ 
    function updateUser(string memory url, string memory publicKey) public returns(bool) {
        if(userDrrMap[msg.sender].isValue == true) {
            UserDRR storage user = userDrrMap[msg.sender];
            user.url = url;
            user.publicKey = publicKey;
            return true;
        } else {
            return false;
        }
    }

    /**
     * @dev Method to check user is already registered using msg.sender.
     * 
     * @return true if user is not registered.
     */ 
    function isUserRegistered() public {
        //Need to check if user already exist in the mapping.
        bool flag = false;
        if(userDrrMap[msg.sender].isValue != true) {
            flag = true;
        }
        else {
            flag = false;
        }
        emit IsUserRegistered(flag);
    }

    /**
     * @dev Method to check if user is already registered before adding to an entity.
     * 
     * @param newUser identifier of the new user.
     * 
     * @return true if user is already registered.
     */ 
    function isUserAlreadyRegistered(address newUser) public {
        //Need to check if user already exist in the mapping.
        bool flag = false;
        if(userDrrMap[newUser].isValue != true) {
            flag = false;
        }
        else {
            flag = true;
        }
        emit IsUserRegistered(flag);
    }

    /**
     * @dev Method to register entity in marketplace.
     * 
     * @param identity The entity identifier.
     * @param entityName The entity name.
     */ 
    function registerEntity(address identity, string memory entityName) public {
        EntityDRR storage entity = entityDrrMap[identity];
        entity.identity = identity;
        entity.isValue = true;
        entity.owners.push(msg.sender);
        entity.users.push(msg.sender);
        entityKeys.push(identity);
        
        //Registering entity name
        entityEnsMap[entityName] = identity ;
        entityNames.push(entityName);
    }
    
    /**
     * dev Method to check if the entity name is unique.
     * 
     * @param entityName The name to be checked.
     */ 
    function isEntityNameUnique(string memory entityName) public {
        bool flag = true;
        for(uint i = 0; i < entityNames.length; i++) {
            if(compareStrings(entityNames[i], entityName)) {
                flag = false;
            }
        }
        emit IsExistEntity(flag);
    }
    
    /**
     * @dev Method to add new user to entity.
     * 
     * @param newUser The identity of new user.
     * @param identity The entity identifier.
     */ 
    function addUserToEntity(address newUser, address identity) public returns(bool) {
        EntityDRR storage entity = entityDrrMap[identity];
        address[] memory owners = entity.owners;
        if(userDrrMap[newUser].isValue == true) {
            for (uint i = 0; i < owners.length; i++) {
                if(owners[i] == msg.sender) {
                    entity.users.push(newUser);
                    return true;
                }
            }
        } else {
            return false;
        }
    }

    /**
     * @dev The method to remove user from entity.
     * 
     * @param user The identity of the user to be removed.
     * @param identity The identity of the entity.
     */ 
    function removeUserFromEntity(address user, address identity) public returns(bool) {
        EntityDRR storage entity = entityDrrMap[identity];
        address[] memory owners = entity.owners;
        address[] memory users = entity.users;
        if(userDrrMap[user].isValue == true) {
            for(uint i =0; i < owners.length; i++) {
                if(owners[i] == msg.sender) {
                    for(uint j = 0; j < users.length-1; j++) {
                        if(users[j] == user) {
                            users[j] = users[users.length-1];
                            delete users[users.length-1];
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    /**
     * @dev Method to get the details of a user.
     * 
     * @param userIdentifier The identifier of the user.
     * 
     * @return name The name of the user.
     * @return url The url of the user.
     * @param publicKey The publicKey of the user.
     */ 
    function getUser(address userIdentifier) public view returns(string memory name, string memory url, string memory publicKey) {
        string memory userName;
        for(uint i = 0; i < userNames.length; i++) {
            if(userEnsMap[userNames[i]] == userIdentifier) {
                userName = userNames[i];
            }
        }
        UserDRR memory user = userDrrMap[userIdentifier];
        return(userName, user.url, user.publicKey);
    }

    /**
     * @dev Method to check if the current user(msg.sender) is already registered.
     * 
     * @return entitiesAddress The list of address of entities in which the user belong to.
     */ 
    function authenticateUser() public view returns(address[] memory entitiesAddress) {
        uint count = 0;

        for(uint i = 0; i < entityKeys.length; i++) {
            EntityDRR memory entity = entityDrrMap[entityKeys[i]];
            for(uint j = 0; j < entity.users.length; j++) {
                if(msg.sender == entity.users[j]) {
                    count ++;
                }
            }
        }
        
        address[] memory entityAddresses = new address[](count);
        uint tempcount = 0;
        
        while(tempcount != count){
            for(uint i = 0; i < entityKeys.length; i++) {
            EntityDRR memory entity = entityDrrMap[entityKeys[i]];
                for(uint j = 0; j < entity.users.length; j++) {
                    if(msg.sender == entity.users[j]) {
                      entityAddresses[tempcount] = entity.identity;
                        tempcount ++;
                    }
                }
            }
        }
        return entityAddresses;
    }

    /**
     * @dev Method to get the entity details.
     * 
     * @param entity The identifier of the entity.
     * 
     * @return entityName The namae of the entity.
     * @return owners The list of owners of the entity.
     * @return users The list of users of the entity.
     * @return apps The list of application owned by the entity.
     * @return apis The list of API's owned by the entity.
     */ 
    function getEntityDetails(address entity) public view returns(string memory entityName, address[] memory owners, address[] memory users, address[] memory apps, address[] memory apis) {
        string memory name;
        for(uint i = 0; i < entityNames.length; i++) {
            if(entityEnsMap[entityNames[i]] == entity) {
                name = entityNames[i];
            }
        }
        EntityDRR memory entity = entityDrrMap[entity];
        return (name, entity.owners, entity.users, entity.apps, entity.apis);
    }
    
    /**
     * @dev Method to retrieve current user details.
     * 
     * @return url The url of the user.
     * @return publicKey The publickey of the user.
     */ 
    function getUser() public view returns(string memory url, string memory publicKey) {
       UserDRR memory user = userDrrMap[msg.sender];
       return (user.url, user.publicKey);
    }

    /**
     * @dev Method to register a new application.
     * 
     * @param appIdentity The unique identifier for application.
     * @param appName The name of the application.
     * @param entityName The name of the entity to which application belong to.
     * @param appVersion The app version.
     * @param url The url of the application.
     * @param apis The list of API's implemented by the application.
     */ 
    function registerApp(address appIdentity, string memory appName, string memory entityName, string memory appVersion, string memory url, string memory apis) public returns(bool) {
        AppDRR storage app = appDrrMap[appIdentity];
        app.identity = appIdentity;
        app.isValue = true;
        app.owner = msg.sender;
        AppVersion memory version;
        version.url = url;
        version.id = appVersion;
        version.api = apis;
        app.versions.push(version);
        //Add appname to appEnsMap.
        appEnsMap[appName] = appIdentity;
        appNames.push(appName);
        //Add Application to entity
        address entityId = entityEnsMap[entityName];
        EntityDRR storage entity = entityDrrMap[entityId];
        entity.apps.push(appIdentity);
        return true;
    }

    /**
     * @dev The method to check if the application name aleady exists.
     *
     * @param appName The name of the application.
     * 
     * @return true if name doesnot exist. 
     */ 
    function isAppNameUnique(string memory appName) public returns(bool) {
        bool flag = true;
        for(uint i = 0; i < appNames.length; i++) {
            if(compareStrings(appNames[i], appName)) {
                flag = false;
            }
        }
        emit IsExistAppName(flag);
    }

    /**
     * @dev The method to register a new API.
     * 
     * @param apiIdentity The unique identifier for API.
     * @param apiName The name of the API.
     * @param entityName The name of the entity to which API belong to.
     * @param apiVersion The API version.
     * @param url The url of the API.
     */ 
    function registerApi(address apiIdentity, string memory apiName, string memory entityName, string memory apiVersion, string memory url) public returns(bool) {
        ApiDRR storage api = apiDrrMap[apiIdentity];
        api.identity = apiIdentity;
        api.isValue = true;
        api.owner = msg.sender;
        ApiVersion memory version;
        version.url = url;
        version.id = apiVersion;
        api.versions.push(version);
        //Add api name and ID mapping to apiEnsMap.
        apiEnsMap[apiName] = apiIdentity;
        apiNames.push(apiName);
        //Add Api to entity
        address entityId = entityEnsMap[entityName];
        EntityDRR storage entity = entityDrrMap[entityId];
        entity.apis.push(apiIdentity);
        return true;
    }
    
    /**
     * @dev The method to check if the API name aleady exists.
     *
     * @param apiName The name of the API.
     * 
     * @return true if name doesnot exist. 
     */ 
    function isApiNameUnique(string memory apiName) public returns(bool) {
        bool flag = true;
        for(uint i = 0; i < apiNames.length; i++) {
            if(compareStrings(apiNames[i], apiName)) {
                flag = false;
            }
        }
        emit IsExistApiName(flag);
    }
    
    /**
     * @dev The method to check if api exist.
     * 
     * @param apiName The name of the api.
     * 
     * @return serialized The list of versions of the api converted to byte.
     */ 
    function isApiExist(string memory apiName) public view returns(bytes memory serialized) {
        for(uint i = 0; i < apiNames.length; i++) {
            if(compareStrings(apiNames[i], apiName)) {
                address apiIdentity = apiEnsMap[apiName];
                ApiDRR memory apiDrr = apiDrrMap[apiIdentity];
                ApiVersion[] memory apiVersions = apiDrr.versions;
                string[] memory versions = new string[](apiVersions.length);
                for(uint j = 0; j < apiVersions.length; j++) {
                    versions[j] = apiVersions[j].id;
                }
                bytes memory serializedVersion = getBytes(versions);
                return serializedVersion;
            }
        }
    }
    
 
    /**
     * @dev Method to add new version to an application.
     * 
     * @param appName The name of the application.
     * @param versionId The new version of the application.
     * @param url The url of the new app version.
     * @param apis The list of API's implemented for the new application.
     */ 
    function addAppVersion(string memory appName, string memory versionId, string memory url, string memory apis) public {
        address appIdentifier = appEnsMap[appName];
        AppDRR storage app = appDrrMap[appIdentifier];
        AppVersion memory newVersion;
        newVersion.id = versionId;
        newVersion.url = url;
        newVersion.api = apis;
        app.versions.push(newVersion);
    }
 
    /**
     * @dev Method to add new version to an API.
     * 
     * @param apiName The name of the API.
     * @param versionId The new version of the API;
     * @param url The url of the new version.
     */ 
    function addApiVersion(string memory apiName, string memory versionId, string memory url) public {
        address apiIdentifier = apiEnsMap[apiName];
        ApiDRR storage api = apiDrrMap[apiIdentifier];
        ApiVersion memory newVersion;
        newVersion.id = versionId;
        newVersion.url = url;
        api.versions.push(newVersion);
    }
 
    /**
     * @dev Method to get an application details.
     * 
     * @param appName The name of the application.
     * 
     * @return serializedVersion The list of application versions converted to bytestream.
     * @return serializedUrl The list of application url's converted to bytestream.
     * @return serializedApis The list API versions converted to bytestream.
     */    
    function searchApp(string memory appName) public view returns (bytes memory serializedVersion, bytes memory serializedUrl, bytes memory serializedApis) {
        address id = appEnsMap[appName];
        AppDRR memory app = appDrrMap[id];
        uint length = app.versions.length;
        string[] memory versionId = new string[](length);
        string[] memory url = new string[](length);
        string[] memory apis = new string[](length);
        for(uint i = 0; i < length; i++) {
            versionId[i] = app.versions[i].id;
            url[i] = app.versions[i].url;
            apis[i] = app.versions[i].api;
        }
        bytes memory serializedVersion = getBytes(versionId);
        bytes memory serializedUrl = getBytes(url);
        bytes memory serializedApis = getBytes(apis);
        return (serializedVersion, serializedUrl, serializedApis);
    }
    
    /**
     * @dev Method to get an API details.
     * 
     * @param apiName The name of the API.
     * 
     * @return serializedVersion The list of API versions converted to bytestream.
     * @return serializedUrl The list of API url's converted to bytestream.
     */ 
    function searchApi(string memory apiName) public view returns (bytes memory serializedVersion, bytes memory serializedUrl) {
        address id = apiEnsMap[apiName];
        ApiDRR memory api = apiDrrMap[id];
        uint length = api.versions.length;
        string[] memory versionId = new string[](length);
        string[] memory url = new string[](length);
        for(uint i = 0; i < length; i++) {
            versionId[i] = api.versions[i].id;
            url[i] = api.versions[i].url;
        }
        bytes memory serializedVersion = getBytes(versionId);
        bytes memory serializedUrl = getBytes(url);
        return (serializedVersion, serializedUrl);
    }
    
        
    /**
     * @dev Method to search for a user.
     * 
     * @param userName The name of the user to be searched.
     * 
     * @return serializedUrl The bytestream of url.
     * @return serializedPublicKey The bytestream of publicKey.
     */ 
    function searchUser(string memory userName) public view returns (bytes memory serializedUrl, bytes memory serializedPublicKey) {
        address id = userEnsMap[userName];
        UserDRR memory user = userDrrMap[id];
        string[] memory url = new string[](1);
        string[] memory publicKey = new string[](1);
        url[0] = user.url;
        publicKey[0] = user.publicKey;
        return (getBytes(url), getBytes(publicKey));
    }
    
    /**
     * @dev Method to get all the API's associated with an entity.
     * 
     * @param entityName The name of the entity.
     * 
     * @return serializedApis The list of apiNames converted to bytestream.
     */ 
    function getApis(string memory entityName) public view returns(bytes memory serializedApis) {
        address entityId = entityEnsMap[entityName];
        EntityDRR storage entity = entityDrrMap[entityId];
        string[] memory apis = new string[](entity.apis.length);
        for(uint i = 0; i < entity.apis.length; i++) {
            
            for(uint j=0; j < apiNames.length; j++) {
                if(entity.apis[i] == apiEnsMap[apiNames[j] ]) {
                    apis[i] = apiNames[j];
                }
            }
            
        }
        return(getBytes(apis));
    }
    
    /**
     * @dev Method to get all the applications associated with an entity.
     * 
     * @param entityName The name of the entity.
     * 
     * @return serializedApps The list of appnames converted to bytestream.
     */ 
    function getApps(string memory entityName) public view returns(bytes memory serializedApps) {
        address entityId = entityEnsMap[entityName];
        EntityDRR storage entity = entityDrrMap[entityId];
        string[] memory apps = new string[](entity.apps.length);
        for(uint i = 0; i < entity.apps.length; i++) {
            for(uint j=0; j < appNames.length; j++) {
                if(entity.apps[i] == appEnsMap[ appNames[j] ]) {
                    apps[i] = appNames[j];
                }
            }
            
        }
        return(getBytes(apps));
    }

   /**
     * @dev Method to get all the users associated with an entity.
     * 
     * @param entityName The name of the entity.
     * 
     * @return serializedUsers The list of userNames converted to bytestream.
     */ 
    function getUsers(string memory entityName) public view returns(bytes memory serializedUsers) {
        address entityId = entityEnsMap[entityName];
        EntityDRR storage entity = entityDrrMap[entityId];
        string[] memory users = new string[](entity.users.length);
        for(uint i = 0; i < entity.users.length; i++) {
            
            for(uint j=0; j < userNames.length; j++) {
                if(entity.users[i] == userEnsMap[ userNames[j] ]) {
                    users[i] = userNames[j];
                }
            }
            
        }
        return(getBytes(users));
    }

    /**
     * @dev Utility method to compare strings.
     * 
     * @param string1 The string to be compared.
     * @param string2 The string to be compared with.
     * 
     * @return bool true if strings are equal.
     */ 
    function compareStrings (string memory string1, string memory string2) public pure returns (bool) {
        return (keccak256(abi.encodePacked((string1))) == keccak256(abi.encodePacked((string2))) );
    }
    
    /**
     * @dev Utility method to convert string array to bytes.
     * 
     * @param stringArray The input string array.
     * 
     * @return buffer The converted byte stream.
     */ 
    function getBytes(string[] memory stringArray) internal pure returns (bytes memory buffer) {
        uint length = stringArray.length;
        uint offset = 64*(length + 1);
        bytes memory buffer = new  bytes(offset);
        string memory out1  = new string(32);
        for(uint i = 0; i < length; i++){
            out1 = stringArray[i];
            stringToBytes(offset, bytes(out1), buffer);
            offset -= sizeOfString(out1);
        }
        return (buffer);
    }
    
    function stringToBytes(uint _offst, bytes memory _input, bytes memory _output) internal pure {
        uint256 stack_size = _input.length / 32;
        if(_input.length % 32 > 0) stack_size++;
        
        assembly {
            stack_size := add(stack_size,1)//adding because of 32 first bytes memory as the length
            for { let index := 0 } lt(index,stack_size){ index := add(index ,1) } {
                mstore(add(_output, _offst), mload(add(_input,mul(index,32))))
                _offst := sub(_offst , 32)
            }
        }
    }
    
    function sizeOfString(string memory _in) internal pure  returns(uint _size){
        _size = bytes(_in).length / 32;
         if(bytes(_in).length % 32 != 0) 
            _size++;
            
        _size++; // first 32 bytes is reserved for the size of the string     
        _size *= 32;
    }
}
