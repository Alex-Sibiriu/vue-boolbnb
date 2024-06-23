<template>
  <div class=" position-relative">
    <div id="map" class="map-container"></div>
    <button @click="resetMap" class="reset-button"><i class="fa-solid fa-arrows-to-dot"></i></button>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import tt from '@tomtom-international/web-sdk-maps';

export default {
  name: 'Map',
  props: {
    apiKey: String,
    lat: Number,
    long: Number,
    houses: Array
  },
  setup(props) {
    let map = null;
    const markers = ref([]);

    onMounted(() => {
      map = tt.map({
        key: props.apiKey,
        container: 'map',
        center: [props.long, props.lat],
        zoom: 11,
      });

      props.houses.forEach(house => {
        const marker = new tt.Marker({
          color: '#9D061B'
        })
          .setLngLat([parseFloat(house.longitude), parseFloat(house.latitude)])
          .addTo(map);

        const popupOffsets = {
          top: [0, 0],
          bottom: [0, -70],
          "bottom-right": [0, -70],
          "bottom-left": [0, -70],
          left: [25, -35],
          right: [-25, -35],
        };

        const popupContent = document.createElement('div');
        const houseLink = document.createElement('div');
        houseLink.textContent = house.title;
        houseLink.style.cursor = 'pointer';
        houseLink.addEventListener('click', () => {
          window.open(`/house-detail/${house.slug}`, '_blank');
        });

        popupContent.appendChild(houseLink);

        const popup = new tt.Popup({ offset: popupOffsets })
          .setDOMContent(popupContent);

        marker.setPopup(popup);

        markers.value.push(marker);
      });

      map.addControl(new tt.NavigationControl());
    });

    const resetMap = () => {
      map.setCenter([props.long, props.lat]);
      map.setZoom(11);
    };

    return { map, markers, resetMap };
  }
};
</script>

<style scoped>
.map-container {
  height: 500px;
}
.reset-button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  padding: 10px;
  background-color: white;
  border: 1px solid #ccc;
  color: #051C2C;
  border-radius: 5px;
  cursor: pointer;
}
</style>
