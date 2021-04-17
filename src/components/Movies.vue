<template>
	<v-card>
		<v-toolbar color="#01d474" dark flat prominent>
			<!-- <v-switch
				style="position: relative; top: 80px"
				v-model="adult"
				label="Childrens"
			></v-switch> -->
			<v-text-field
				append-icon="mdi-microphone"
				class="mx-4"
				flat
				hide-details
				label="Search"
				prepend-inner-icon="mdi-magnify"
				solo-inverted
				v-model="search_movie"
			></v-text-field>

			<template v-slot:extension>
				<v-tabs v-model="tabs" centered>
					<v-tab @click="topRatedTab">Top Rated</v-tab>
					<v-tab @click="upComingTab">Upcoming</v-tab>
				</v-tabs>
			</template>
		</v-toolbar>

		<v-tabs-items v-model="tabs">
			<v-tab-item>
				<v-card flat>
					<v-card-text>
						<!-- <p>
						{{top_rated_movies}}
						</p> -->
						<v-container fluid>
							<v-row>
								<v-col
									v-for="top_rated_movie in top_rated_movies"
									:key="top_rated_movie.id"
									:cols="col_size"
								>
									<movieItem :movie="top_rated_movie" />
								</v-col>
							</v-row>
							<v-row>
								<v-col style="justify-content: center; display: flex">
									<v-btn
										v-show="more_images"
										small
										color="success"
										dark
										@click="loadMore('top_rated')"
									>
										Load More
									</v-btn>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card flat>
					<v-card-text>
						<!-- <p>
						{{up_coming_movies}}
						</p> -->
						<v-container fluid>
							<v-row>
								<v-col
									v-for="up_coming_movie in up_coming_movies"
									:key="up_coming_movie.id"
									:cols="col_size"
								>
									<movieItem :movie="up_coming_movie" />
								</v-col>
							</v-row>
							<v-row>
								<v-col style="justify-content: center; display: flex">
									<v-btn
										v-show="more_images"
										small
										color="success"
										dark
										@click="loadMore('upcoming')"
									>
										Load More
									</v-btn>
								</v-col>
							</v-row>
						</v-container>
					</v-card-text>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-card>
</template>
<script>
import axios from "axios";
import movieItem from "./MovieItem";
import FilterComponent from "./filter.vue";
export default {
	components: {
		movieItem,
		FilterComponent,
	},
	data() {
		return {
			selected_category: "",
			currentPage: 1,
			search_movie: "",
			tabs: null,
			top_rated_movies: [],
			up_coming_movies: [],
			total_pages: "",
			more_images: true,
			query: "",
			col_size: "",
			adult: false,
		};
	},
	mounted() {
		this.topRated();
		console.log("window.innerWidth", window.innerWidth);
		if (window.innerWidth < 600) {
			this.col_size = 6;
		} else {
			this.col_size = 2;
		}
	},
	watch: {
		adult(val) {
			if (this.selected_category === "top_rated") {
				this.top_rated_movies = [];
					this.adult = val
				this.topRated();
				this.more_images = true;
			
			} else if (this.selected_category === "upcoming") {
				this.up_coming_movies = [];
					this.adult = val
				this.upComing();
				this.more_images = true;
			}
		},
		search_movie(val) {
			if (val !== "") {
				if (val.length > 3) {
					this.getResult(val);
					console.log("movie naem", val);
					this.more_images = false;
				}
			} else {
				if (this.selected_category === "top_rated") {
					this.top_rated_movies = [];
					this.topRated();
					this.more_images = true;
				} else if (this.selected_category === "upcoming") {
					this.up_coming_movies = [];
					this.upComing();
					this.more_images = true;
				}
			}
		},
	},
	methods: {
		getResult(query) {
			axios
				.get(
					"https://api.themoviedb.org/3/search/movie?api_key=8e8ccbc0d37ce644268271b46c694999&query=" +
						query
				)
				.then((response) => {
					this.results = response.data.results;
					if (this.selected_category === "top_rated") {
						this.top_rated_movies = [];
						this.top_rated_movies = this.results;
					} else if (this.selected_category === "upcoming") {
						this.up_coming_movies = [];
						this.up_coming_movies = this.results;
					}
				});
		},
		topRatedTab() {
			this.top_rated_movies = [];
			this.currentPage = 1;
			this.topRated();
		},
		topRated(query) {
			console.log("top rated");
			this.selected_category = "top_rated";
			axios
				.get(
					`https://api.themoviedb.org/3/movie/top_rated?api_key=8e8ccbc0d37ce644268271b46c694999&language=en-US&page=${this.currentPage}`,
					{
						params: {
							query: query,
						},
						headers: {
							Authorization: `Bearer ${localStorage.userAccessToken}`,
						},
					}
				)
				.then(async (response) => {
					console.log("response", response);
					this.total_pages = response.data.total_pages;
					let movies = response.data.results;
					movies.forEach((movie) => {
						this.top_rated_movies.push(movie);
					});
				})
				.catch((error) => {
					this.handleError(error);
				});
		},
		upComingTab() {
			this.up_coming_movies = [];
			this.currentPage = 1;
			this.upComing();
		},
		upComing(query) {
			this.selected_category = "upcoming";
			console.log("upcoming");
			axios
				.get(
					`https://api.themoviedb.org/3/movie/upcoming?api_key=8e8ccbc0d37ce644268271b46c694999&language=en-US&page=${this.currentPage}`,
					{
						params: {
							query: query,
							adult:this.adult
						},
						headers: {
							Authorization: `Bearer ${localStorage.userAccessToken}`,
						},
					}
				)
				.then(async (response) => {
					console.log("response", response);
					this.total_pages = response.data.total_pages;
					let movies = response.data.results;
					movies.forEach((movie) => {
						this.up_coming_movies.push(movie);
					});
				})
				.catch((error) => {
					this.handleError(error);
				});
		},
		loadMore(category) {
			this.currentPage = this.currentPage + 1;
			if (category === "top_rated") {
				if (this.currentPage !== this.total_pages) {
					this.topRated();
				} else {
					this.more_images = false;
				}
			} else if (category === "upcoming") {
				if (this.currentPage !== this.total_pages) {
					this.upComing();
				} else {
					this.more_images = false;
				}
			}
		},
		searchMovie(val) {},
	},
};
</script>
conso