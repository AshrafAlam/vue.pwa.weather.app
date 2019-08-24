<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          color="green"
          title="Simple Table"
          text="Here is a subtitle for this table"
        >
          <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.city }}</td>
              <td class="text-xs-right">{{ item.salary }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex
        md12
      >
        <material-card
          color="green"
          flat
          full-width
          title="Table on Plain Background"
          text="Here is a subtitle for this table"
        >
          <v-data-table
            :headers="headers"
            :items="items.slice(0, 7)"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.city }}</td>
              <td class="text-xs-right">{{ item.salary }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        sortable: false,
        text: 'Name',
        value: 'name'
      },
      {
        sortable: false,
        text: 'Country',
        value: 'country'
      },
      {
        sortable: false,
        text: 'City',
        value: 'city'
      },
      {
        sortable: false,
        text: 'Salary',
        value: 'salary',
        align: 'right'
      }
    ],
    items: [
      {
        name: 'Dakota Rice',
        country: 'Niger',
        city: 'Oud-Tunrhout',
        salary: '$35,738'
      },
      {
        name: 'Minerva Hooper',
        country: 'Curaçao',
        city: 'Sinaai-Waas',
        salary: '$23,738'
      }, {
        name: 'Sage Rodriguez',
        country: 'Netherlands',
        city: 'Overland Park',
        salary: '$56,142'
      }, {
        name: 'Philip Chanley',
        country: 'Korea, South',
        city: 'Gloucester',
        salary: '$38,735'
      }, {
        name: 'Doris Greene',
        country: 'Malawi',
        city: 'Feldkirchen in Kārnten',
        salary: '$63,542'
      }, {
        name: 'Mason Porter',
        country: 'Chile',
        city: 'Gloucester',
        salary: '$78,615'
      }
    ],
  hourlyForeCast:
  ///
    {
        "cod": "200",
        "message": 0.0151,
        "cnt": 96,
        "list": [
            {
                "dt": 1553709600,
                "main": {
                    "temp": 278.76,
                    "temp_min": 278.76,
                    "temp_max": 279.558,
                    "pressure": 1031.934,
                    "sea_level": 1031.934,
                    "grnd_level": 971.745,
                    "humidity": 100,
                    "temp_kf": -0.8
                },
                "weather": [
                    {
                        "id": 803,
                        "main": "Clouds",
                        "description": "broken clouds",
                        "icon": "04n"
                    }
                ],
                "clouds": {
                    "all": 77
                },
                "wind": {
                    "speed": 1.6,
                    "deg": 40.932
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2019-03-27 18:00:00"
            }
        ],
        "city": {
            "id": 2867714,
            "name": "Munich",
            "coord": {
                "lat": 48.1371,
                "lon": 11.5754
            },
            "country": "DE",
            "population": 1260391
        }
    }  
  //// dailyForeCast ends
  })
}
</script>
