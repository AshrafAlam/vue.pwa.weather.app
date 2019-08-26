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
      favouriteCities: [],
      searchCity: ""
    };
  },
  created: function() {
    //this.fetchHourlyItems();
    this.fetchFavouriteCities();
  },
  methods: {
    onSearchClick() {
      this.fetchHourlyItems();
    },
    onSaveClick() {
      firebase.db.collection("fav-cities").add({
        CityName: this.searchCity
      });
    },
    onCurrentLocation() {
      this.searchCity = "Singapore";
    },
    fetchHourlyItems() {
      if (this.isOnline) {
        //load data from api
        var url =
          "https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/forecast/hourly?q=" +
          this.searchCity +
          "&appid=b6907d289e10d714a6e88b30761fae22";
        axios.defaults.withCredentials = false;
        axios.defaults.headers.common["x-requested-with"] = "ahraf.com";
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
