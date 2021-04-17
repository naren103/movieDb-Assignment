<template>
	<div>
		<v-card @click="dialog = true">
			<v-img
				style="height: 100%; width: 100%"
				:src="image"
				class="white--text align-end"
				gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
			>
				<!-- <v-card-title v-text="movie.original_title"></v-card-title> -->
				<v-card-text>
					<div>
						{{ movie.title }}
					</div>
				</v-card-text>
			</v-img>
			<v-card-actions>
				<v-btn icon>
					<span>{{ movie.vote_average }}</span>
				</v-btn>

				<v-spacer></v-spacer>

				<v-btn icon>
					<v-icon small>mdi-thumb-up</v-icon>
				</v-btn>
				<v-btn icon>
					<span>{{ movie.vote_count }}</span>
				</v-btn>
			</v-card-actions>
		</v-card>
		<v-dialog v-model="dialog" width="600">
			<v-card>
				<v-img height="200px" :src="inner_image">
					<v-app-bar flat color="rgba(0, 0, 0, 0)">
						<v-spacer></v-spacer>

						<v-card-title
							class="white--text mt-8"
							style="width: 200px; height: 300px"
						>
							<p>
								{{ movie.title }}
							</p>
						</v-card-title>
					</v-app-bar>
				</v-img>

				<v-card-text>
					<div class="font-weight-bold ml-8 mb-2">
						{{ movie.title }}
					</div>

					<v-timeline align-top dense>
						<v-timeline-item :color="message.color" small>
							<div>
								<div class="font-weight-normal">
									<strong>Date Of Release - {{ movie.release_date }} </strong>
                                    <v-spacer></v-spacer>
                                    <strong>Rating</strong> @{{ movie.vote_average }}
								</div>
                                <div> Overview</div>
								<div>{{ movie.overview }}</div>
							</div>
						</v-timeline-item>
					</v-timeline>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
export default {
	props: ["movie"],
	data() {
		return {
			message: {
				from: "You",
				message: `Sure, I'll see you later.`,
				time: "10:42am",
				color: "deep-purple lighten-1",
			},
			noImage: false,
			dialog: false,
			image: "https://image.tmdb.org/t/p/w500" + this.movie.poster_path,
			inner_image: "https://image.tmdb.org/t/p/w500" + this.movie.backdrop_path,
		};
	},
	methods: {
		year(date) {
			var movie_year = new Date(date);
			return movie_year.getFullYear();
		},
		poster() {
			if (this.movie.poster_path) {
				return (
					"https://image.tmdb.org/t/p/w370_and_h556_bestv2" +
					this.movie.poster_path
				);
			} else {
				this.noImage = true;
			}
		},
	},
};
</script>

<style>
</style>