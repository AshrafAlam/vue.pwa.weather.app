<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-left wrap>
      <v-flex xs12 md8>
        <material-card color="green" title="Search" text="Search for forecast data">
          <v-form>
            <v-container py-0>
              <v-layout wrap>
                <v-flex xs12 md3>
                  <v-text-field label="City" v-model="searchCity" />
                </v-flex>
                <v-flex xs12 md6></v-flex>
                <v-flex xs12 md3 justify-right>
                  <v-select
                    v-model="searchCity"
                    :items="favouriteCities"
                    label="Select a favorite city"
                  ></v-select>
                </v-flex>
                <v-flex xs12 md2>
                  <v-btn
                    class="mx-0 font-weight-light"
                    @click="onSearchClick()"
                    color="success"
                  >Find Forecast</v-btn>
                </v-flex>
                <v-flex xs12 md2>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="onCurrentLocation()"
                  >Current City</v-btn>
                </v-flex>
                <v-flex xs12 md2>
                  <v-btn
                    class="mx-0 font-weight-light"
                    color="success"
                    @click="onSaveClick()"
                  >Save Search</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex md12>
        <material-card
          color="green"
          flat
          full-width
          title="Daily Weather Forecast"
          text="Shows forecast data with temp, humidity etc."
        >
          <v-data-table :headers="headers" :items="dailyForeCast.list" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text" />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.dt }}</td>
              <td>{{ item.temp.day }}</td>
              <td>-</td>
              <td>{{ item.humidity }}</td>
              <td>{{ item.pressure }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex md12>
        <material-card
          color="green"
          flat
          full-width
          title="Hourly Weather Forecast"
          text="Shows forecast data with temp, humidity etc."
        >
          <v-data-table :headers="headers" :items="hourlyForeCast.list" hide-actions>
            <template slot="headerCell" slot-scope="{ header }">
              <span class="subheading font-weight-light text--darken-3" v-text="header.text" />
            </template>
            <template slot="items" slot-scope="{ item }">
              <td>{{ item.dt }}</td>
              <td>{{ item.main.temp }}</td>
              <td>{{ item.main.sea_level }}</td>
              <td>{{ item.main.humidity }}</td>
              <td>{{ item.main.pressure }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
import firebase from "../configFirebase.js";

export default {
  data() {
    return {
      headers: [
        {
          sortable: false,
          text: "Time",
          value: "time"
        },
        {
          sortable: false,
          text: "Temp",
          value: "temp"
        },
        {
          sortable: false,
          text: "Sea Level",
          value: "sealevel"
        },
        {
          sortable: false,
          text: "Humidity",
          value: "humidity"
        },
        {
          sortable: false,
          text: "Pressure",
          value: "pressure"
        }
      ],
      hourlyForeCast: {},
      dailyForeCast: {},
      favouriteCities: [],
      searchCity: ""
    };
  },
  created: function() {
    //this.fetchHourlyItems();
    this.fetchFavouriteCities();
  },
  mounted() {
    let geo1Script = document.createElement("script");
    geo1Script.setAttribute(
      "src",
      "https://js.api.here.com/v3/3.0/mapsjs-core.js"
    );
    document.head.appendChild(geo1Script);
    let geo2Script = document.createElement("script");
    geo2Script.setAttribute(
      "src",
      "https://js.api.here.com/v3/3.0/mapsjs-service.js"
    );
    document.head.appendChild(geo2Script);
  },
  methods: {
    onSearchClick() {
      //this.fetchHourlyItems();
      this.fetchWeatherData("hourly");
      this.fetchDailyItems();
    },
    onSaveClick() {
      firebase.db.collection("fav-cities").add({
        CityName: this.searchCity
      });
    },
    onCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          var platform = new H.service.Platform({
            app_id: "lrA7HHg3IwOzGvbXWr4K",
            app_code: "Qn0AIgmz2r6-QKTFnPUF4w"
          });
          var geocoder = platform.getGeocodingService();
          geocoder.reverseGeocode(
            {
              mode: "retrieveAddresses",
              maxresults: 1,
              prox: position.coords.latitude + "," + position.coords.longitude
            },
            data => {
              this.searchCity =
                data.Response.View[0].Result[0].Location.Address.City;
            },
            error => {
              alert(error);
            }
          );
        });
      } else {
        console.error("Geolocation is not supported by this browser!");
      }
    },
    fetchHourlyItems() {
      if (this.isOnline) {
        //load data from api
        var url =
          "https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/forecast/hourly?q=" +
          this.searchCity +
          "&appid=b6907d289e10d714a6e88b30761fae22";
        axios.defaults.withCredentials = false;
        axios.defaults.headers.common["x-requested-with"] = "ashraf.com";
        axios.get(url).then(response => {
          this.hourlyForeCast = response.data;
          this.$offlineStorage.set(
            "hour_data_" + this.searchCity,
            response.data
          );
        });
      } else {
        if (this.$offlineStorage.get("hour_data_" + this.searchCity) == null)
          this.hourlyForeCast = {};
        else
          this.hourlyForeCast = this.$offlineStorage.get(
            "hour_data_" + this.searchCity
          );
      }
    },
    fetchDailyItems() {
      if (this.isOnline) {
        var url =
          "https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/forecast/daily?q=" +
          this.searchCity +
          "&appid=b6907d289e10d714a6e88b30761fae22";
        axios.defaults.withCredentials = false;
        axios.defaults.headers.common["x-requested-with"] = "ashraf.com";
        axios.get(url).then(response => {
          this.dailyForeCast = response.data;
          this.$offlineStorage.set(
            "daily_data_" + this.searchCity,
            response.data
          );
        });
      } else {
        if (this.$offlineStorage.get("daily_data_" + this.searchCity) == null)
          this.dailyForeCast = {};
        else
          this.dailyForeCast = this.$offlineStorage.get(
            "daily_data_" + this.searchCity
          );
      }
    },
    fetchWeatherData(endPointType) {
      var data_cache_key = endPointType + "_data_" + this.searchCity;

      if (this.isOnline) {
        var url =
          "https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/forecast/" +
          endPointType +
          "?q=" +
          this.searchCity +
          "&appid=b6907d289e10d714a6e88b30761fae22";
        axios.defaults.withCredentials = false;
        axios.defaults.headers.common["x-requested-with"] = "ashraf.com";
        axios.get(url).then(response => {
          if (endPointType == "hourly") this.hourlyForeCast = response.data;
          this.$offlineStorage.set(data_cache_key, response.data);
        });
      } else {
        var data;
        if (this.$offlineStorage.get(data_cache_key) == null) data = {};
        else data = this.$offlineStorage.get(data_cache_key);

        if (endPointType == "hourly") this.hourlyForeCast = data;
      }
    },
    fetchFavouriteCities() {
      firebase.db
        .collection("fav-cities")
        .orderBy("CityName", "desc")
        .onSnapshot(snapShot => {
          this.favouriteCities = [];
          snapShot.forEach(city => {
            this.favouriteCities.push(city.data().CityName);
          });
        });
    }
  }
};
</script>
