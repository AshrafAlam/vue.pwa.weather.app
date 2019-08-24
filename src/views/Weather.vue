<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
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
          sortable: true,
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
      hourlyForeCast: {}
    };
  },
  created: function() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      axios
        .get(
          "https://samples.openweathermap.org/data/2.5/forecast/hourly?q=Singapore,us&appid=b6907d289e10d714a6e88b30761fae22",
          { crossdomain: true }
        )
        .then(response => {
          this.hourlyForeCast = response;
        });
    }
  }
};
</script>
