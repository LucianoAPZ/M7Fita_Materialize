document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    //console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
}

window.onload = (event) => {
    console.log("Pàgina carregada completament. Inicialitzant..");
    var options = { "swipeable": true };
    var el = document.getElementsByClassName('tabs');
    var instance = M.Tabs.init(el, options);
};

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {
      // specify options here
    });
  });

/* 
//API
document.addEventListener('DOMContentLoaded', function() {
    const tab1 = document.getElementById('test-swipe-1');
    
    fetch('https://www.dnd5eapi.co/api/monsters')
        .then(response => response.json())
        .then(data => {
            console.log('Lista de monstruos:', data.results);
            // Limitar a los primeros 5 monstruos
            const monsterPromises = data.results.slice(0, 5).map(monster => 
                fetch(`https://www.dnd5eapi.co${monster.url}`).then(response => response.json())
            );
  
            Promise.all(monsterPromises)
                .then(monsterData => {
                    console.log('Detalles de los monstruos:', monsterData);
  
                    // Crear el elemento ul
                    const monsterUl = document.createElement('ul');
                    monsterUl.className = 'monster-list';
  
                    monsterData.forEach(monster => {
                        const monsterLi = document.createElement('li');
                        const monsterA = document.createElement('a');
                        monsterLi.className = 'monster';
                        const monsterImageUrl = `https://www.dnd5eapi.co${monster.image}`;
                        monsterA.innerHTML = `
                            <h3>${monster.name}</h3>
                            <img src="${monsterImageUrl}" alt="${monster.name}">
                        `;
                        monsterLi.appendChild(monsterA);
                        monsterUl.appendChild(monsterLi);
                    });
  
                    // Agregar el ul al tab1
                    tab1.appendChild(monsterUl);
                })
                .catch(error => console.error('Error fetching monster data:', error));
        })
        .catch(error => console.error('Error fetching data:', error));
});

*/

document.addEventListener('DOMContentLoaded', function() {
    const tab1 = document.getElementById('test-swipe-1');
    const monsterDetailDiv = document.getElementById('monster-detail');
    
    fetch('https://www.dnd5eapi.co/api/monsters')
        .then(response => response.json())
        .then(data => {
            console.log('Lista de monstruos:', data.results);

            // Limitar a los primeros 5 monstruos
            const monsterPromises = data.results.slice(0, 12).map(monster => 
                fetch(`https://www.dnd5eapi.co${monster.url}`).then(response => response.json())
            );

            Promise.all(monsterPromises)
                .then(monsterData => {
                    console.log('Detalles de los monstruos:', monsterData);

                    // Crear el elemento ul
                    const monsterUl = document.createElement('ul');
                    monsterUl.className = 'monster-list';

                    monsterData.forEach(monster => {
                        const monsterLi = document.createElement('li');
                        const monsterA = document.createElement('a');
                        monsterLi.className = 'monster';
                        const monsterImageUrl = `https://www.dnd5eapi.co${monster.image}`;

                        // Asignamos el nombre del monstruo al link
                        monsterA.innerHTML = `
                            <h3>${monster.name}</h3>
                            <img src="${monsterImageUrl}" alt="${monster.name}">
                        `;

                        monsterA.addEventListener('click', function() {
                            // Al hacer clic, redirige a test-swipe-2 y muestra la información
                            document.getElementById('tabs-swipe-demo').querySelector('a[href="#test-swipe-2"]').click();
                        
                            // Limpiar el div de detalles
                            monsterDetailDiv.innerHTML = `<h4>Cargando información del monstruo...</h4>`;
                        
                            // Buscar detalles completos del monstruo
                            fetch(`https://www.dnd5eapi.co${monster.url}`)
                                .then(response => response.json())
                                .then(monsterDetail => {
                                    console.log('Información completa del monstruo:', monsterDetail);
                        
                                    // Mostrar la información del monstruo
                                    monsterDetailDiv.innerHTML = `
                                        <div id='monsterText'>
                                            <h3>${monsterDetail.name}</h3>
                                            <p><strong>Description:</strong> ${monsterDetail.desc || 'Not available'}</p>
                                            <p><strong>Size:</strong> ${monsterDetail.size || 'Not available'}</p>
                                            <p><strong>Type:</strong> ${monsterDetail.type || 'Not available'}</p>
                                            <p><strong>SubType:</strong> ${monsterDetail.subtype || 'Not available'}</p>
                                            <p><strong>Language:</strong> ${monsterDetail.languages || 'Not available'}</p>
                                        </div>
                                        <div id='monsterImg'>
                                            <img src="https://www.dnd5eapi.co${monsterDetail.image}" alt="${monsterDetail.name}" style="max-width: 200px;">
                                        </div>
                                    `;
                                })
                                .catch(error => {
                                    monsterDetailDiv.innerHTML = `<p>Error al obtener la información del monstruo.</p>`;
                                    console.error('Error fetching monster details:', error);
                                });
                        });                                                

                        monsterLi.appendChild(monsterA);
                        monsterUl.appendChild(monsterLi);
                    });

                    // Agregar el ul al tab1
                    tab1.appendChild(monsterUl);
                })
                .catch(error => console.error('Error fetching data:', error));
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.addEventListener("deviceready", function () {
    const takePhotoButton = document.getElementById("take-photo");
    const profilePhoto = document.querySelector("a img.circle"); // Selecciona la imagen del perfil

    // Primero verificamos si ya tenemos una imagen guardada en localStorage
    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
        // Si la imagen ya está guardada, la mostramos
        profilePhoto.src = storedImage;
    }

    takePhotoButton.addEventListener("click", function () {
        // Llama a la cámara para tomar una foto
        navigator.camera.getPicture(
            function (imageData) {
                // imageData ahora es una cadena base64 directamente
                console.log("Imagen tomada en base64: ", imageData);

                // Asigna la imagen al elemento de imagen del perfil
                profilePhoto.src = imageData;

                // Guardar la imagen en localStorage para futuras visitas
                localStorage.setItem('profileImage', imageData.split(',')[1]); // Guardamos solo la parte base64

                console.log("Imagen guardada en localStorage");
            },
            function (error) {
                console.error("Error al tomar la foto: ", error);
                alert("No se pudo tomar la foto. Inténtalo nuevamente.");
            },
            {
                quality: 50, // Calidad de la imagen
                destinationType: Camera.DestinationType.DATA_URL, // Obtén la imagen en formato base64
                sourceType: Camera.PictureSourceType.CAMERA, // Usa la cámara
                allowEdit: true, // Permite recortar la imagen
                targetWidth: 300, // Ancho de la imagen
                targetHeight: 300, // Alto de la imagen
                saveToPhotoAlbum: false // No guardar en el álbum del dispositivo
            }
        );
    });
});
