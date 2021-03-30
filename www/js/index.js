
        document.addEventListener('deviceready', onDeviceReady, false);
        var toAppend = [{
            "id": 0,
            "indexID": 0,
            "count" : 250,
            "timestamp" : new Date()
        }];

        
        
        function onDeviceReady() {

            console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
            document.getElementById('deviceready').classList.add('ready');
            
            }
            
            document.getElementById("createFile").addEventListener("click", createFile);
            document.getElementById("writeFile").addEventListener("click", writeFile);
            document.getElementById("readFile").addEventListener("click", readFile);
            document.getElementById("removeFile").addEventListener("click", removeFile);
            
            function openNav() {
                document.getElementById("mySidenav").style.width = "47%" //opens side navbar by 70 percent
                document.getElementById('backdrop').style.display = "block" //displays overlay
            }
            
            function closeNav() {
                document.getElementById("mySidenav").style.width = "0"
                document.getElementById('backdrop').style.display = "none"
            }

            function createFile() {
                var type = window.PERSISTENT;
                var size = 5*1024*1024;
                window.requestFileSystem(type, size, successCallback, errorCallback)
            
                function successCallback(fs) {
                fs.root.getFile('log.JSON', {create: true, exclusive: true}, function(fileEntry) {
                    alert('File creation successfull!')
                }, errorCallback);
                }
                
                function errorCallback(error) {
                alert("ERROR: " + error.code)
                }
                
            }

            function writeFile() {
                var type = window.PERSISTENT;
                var size = 5*1024*1024;
                window.requestFileSystem(type, size, successCallback, errorCallback)
            
                function successCallback(fs) {
                fs.root.getFile('log.JSON', {create: true}, function(fileEntry) {
            
                    fileEntry.createWriter(function(fileWriter) {
                        fileWriter.onwriteend = function(e) {
                            alert('Write completed.');
                        };
            
                        fileWriter.onerror = function(e) {
                            alert('Write failed: ' + e.toString());
                        };
                        let json = JSON.stringify(toAppend);
                        var blob = new Blob([json], {type: 'text/plain'});
                        console.log(blob);
                        fileWriter.write(blob);
                    }, errorCallback);
                }, errorCallback);
                }
            
                function errorCallback(error) {
                alert("ERROR: " + error.code)
                }
            }

            function readFile() {
                var type = window.PERSISTENT;
                var size = 5*1024*1024;
                window.requestFileSystem(type, size, successCallback, errorCallback)
            
                function successCallback(fs) {
                fs.root.getFile('log.JSON', {}, function(fileEntry) {
            
                    fileEntry.file(function(file) {
                        var reader = new FileReader();
            
                        reader.onloadend = function(e) {
                            var txtArea = document.getElementById('textarea');
                            txtArea.value = this.result;
                        };
                        reader.readAsText(file);
                    }, errorCallback);
                }, errorCallback);
                }
            
                function errorCallback(error) {
                alert("ERROR: " + error.code)
                }
            }

            function removeFile() {
                var type = window.PERSISTENT;
                var size = 5*1024*1024;
                window.requestFileSystem(type, size, successCallback, errorCallback)
            
                function successCallback(fs) {
                fs.root.getFile('log.JSON', {create: false}, function(fileEntry) {
            
                    fileEntry.remove(function() {
                        alert('File removed.');
                    }, errorCallback);
                }, errorCallback);
                }
            
                function errorCallback(error) {
                alert("ERROR: " + error.code)
                }
            }
        // }