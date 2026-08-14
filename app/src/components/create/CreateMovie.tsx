import styles from "./CreateMovie.module.css";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

// const genres = [
// 	"Action",
// 	"Adventure",
// 	"Animation",
// 	"Comedy",
// 	"Crime",
// 	"Documentary",
// 	"Drama",
// 	"Fantasy",
// 	"Horror",
// 	"Mystery",
// 	"Romance",
// 	"Sci-Fi",
// 	"Thriller",
// 	"War",
// 	"Western",
// ];

const currentYear = new Date().getFullYear();

const initialValues = {
	title: "",
	year: "",
	rating: "1.0",
	genre: "",
	poster: "",
	synopsis: "",
	duration: "",
	director: "",
	trailerUrl: ""
};

function isValidUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

export default function CreateMovie() {
	const { formInputRegister, data, setData } = useForm(initialValues)
	const { request } = useFetch()
	const { user } = useContext(UserContext)

	async function actionHandler() {

		try {
			const result = await request("/movies/create", "POST", { accessToken: user.accessToken }, data );

			console.log(result);
		} catch (error) {
						
			if (error instanceof Error) {
				alert(error.message)
			} else if (typeof error === "string") {
				alert(error);
			} else {
				alert("An unexpected error occurred");
			};
		};
	}

	const handleReset = () => {
		setData(initialValues);
	};

	const showPosterPreview = data.poster.trim() !== "" && isValidUrl(data.poster);

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>

				{/* ─── Page header ─── */}
				<div className={styles.pageEyebrow}>Film Management</div>
				<h1 className={styles.pageTitle}>Add a New Movie</h1>
				<p className={styles.pageSubtitle}>
					Fill in the details below to add a film to the Reelist catalogue.
				</p>

				<form action={actionHandler} noValidate>

					{/* ─── Card 1: Core info ─── */}
					<div className={styles.card}>
						<div className={styles.cardTitle}>Core Information</div>

						<div className={styles.formGrid}>

							{/* Title */}
							<div className={`${styles.field} ${styles.colSpan2}`}>
								<label className={styles.label} htmlFor="title">
									Title <span className={styles.required}>*</span>
								</label>
								<input
									id="title"
									{...formInputRegister("title")}
									type="text"
									// className={`${styles.input}${errors.title ? ` ${styles["input--error"]}` : ""}`}
									className={styles.input}
									placeholder="e.g. Oppenheimer"
									autoComplete="off"
								/>
								{/* {errors.title && <span className={styles.errorMsg}>{errors.title}</span>} */}
							</div>

							{/* Director */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="director">
									Director <span className={styles.required}>*</span>
								</label>
								<input
									id="director"
									{...formInputRegister("director")}
									type="text"
									className={styles.input}
									placeholder="e.g. Christopher Nolan"
								/>
								{/* {errors.director && <span className={styles.errorMsg}>{errors.director}</span>} */}
							</div>

							{/* Genre */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="genre">
									Genre <span className={styles.required}>*</span>
								</label>
								<input
									id="genre"
									{...formInputRegister("genre")}
									className={styles.input}
								// className={`${styles.select}${errors.genre ? ` ${styles["select--error"]}` : ""}`}
								/>
								{/* {errors.genre && <span className={styles.errorMsg}>{errors.genre}</span>} */}
							</div>

						</div>
					</div>

					{/* ─── Card 2: Details ─── */}
					<div className={styles.card}>
						<div className={styles.cardTitle}>Film Details</div>

						<div className={styles.formGridThree}>

							{/* Year */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="year">
									Year <span className={styles.required}>*</span>
								</label>
								<input
									id="year"
									type="number"
									{...formInputRegister("year")}
									min={1888}
									max={currentYear + 5}
									className={styles.input}
									placeholder={String(currentYear)}
								/>
								{/* {errors.year && <span className={styles.errorMsg}>{errors.year}</span>} */}
							</div>

							{/* Duration */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="duration">
									Duration <span className={styles.required}>*</span>
								</label>
								<input
									id="duration"
									{...formInputRegister("duration")}
									type="text"
									className={styles.input}
									placeholder="e.g. 2h 46m"
								/>
								{/* {errors.duration && <span className={styles.errorMsg}>{errors.duration}</span>}
								{!errors.duration && (
									<span className={styles.inputHint}>Format: 2h 15m or 135m</span>
								)} */}
							</div>

							{/* Rating */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="rating">
									Rating
								</label>
								<div className={styles.ratingRow}>
									<input
										id="rating"
										{...formInputRegister("rating")}
										type="range"
										min={1}
										max={10}
										step={0.1}
										className={styles.ratingSlider}
									/>
									<span className={styles.ratingBadge}>★ {Number(data.rating).toFixed(1)}</span>
								</div>
							</div>

						</div>
					</div>

					{/* ─── Card 3: Media ─── */}
					<div className={styles.card}>
						<div className={styles.cardTitle}>Media & Links</div>

						<div className={styles.formGrid}>

							{/* Poster URL */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="posterUrl">
									Poster URL <span className={styles.required}>*</span>
								</label>
								<input
									id="posterUrl"
									{...formInputRegister("poster")}
									type="url"
									className={styles.input}
									placeholder="https://…"
								/>
								{/* {errors.posterUrl && <span className={styles.errorMsg}>{errors.posterUrl}</span>} */}

								{/* Live poster preview */}
								<div className={styles.posterPreviewWrapper}>
									{showPosterPreview ? (
										<img
											src={data.poster}
											alt="Poster preview"
											className={styles.posterPreviewImg}
										// onError={() => setPosterError(true)}
										/>
									) : (
										<div className={styles.posterPreviewEmpty}>
											<span className={styles.posterPreviewIcon}>🎬</span>
											<span className={styles.posterPreviewText}>Poster preview</span>
										</div>
									)}
								</div>
							</div>

							{/* Trailer URL */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="trailerUrl">
									Trailer URL
								</label>
								<input
									id="trailerUrl"
									type="url"
									{...formInputRegister("trailerUrl")}
									className={styles.input}
									placeholder="https://youtube.com/…"
								/>
								{/* {errors.trailerUrl && <span className={styles.errorMsg}>{errors.trailerUrl}</span>}
								{!errors.trailerUrl && (
									<span className={styles.inputHint}>Optional — YouTube or Vimeo link</span>
								)} */}
							</div>

						</div>
					</div>

					{/* ─── Card 4: Synopsis ─── */}
					<div className={styles.card}>
						<div className={styles.cardTitle}>Synopsis</div>

						<div className={styles.field}>
							<label className={styles.label} htmlFor="synopsis">
								Synopsis <span className={styles.required}>*</span>
							</label>
							<textarea
								id="synopsis"
								{...formInputRegister("synopsis")}
								// name="synopsis"
								className={styles.textarea}
								placeholder="Write a short description of the film…"
								// value={form.synopsis}
								// onChange={handleChange}
								rows={5}
							/>
							{/* {errors.synopsis && <span className={styles.errorMsg}>{errors.synopsis}</span>} */}
							<span className={styles.inputHint}>
								{data.synopsis.trim().length} characters
								{data.synopsis.trim().length > 0 && data.synopsis.trim().length < 30
									? ` — ${30 - data.synopsis.trim().length} more needed`
									: ""}
							</span>
						</div>
					</div>

					{/* ─── Actions ─── */}
					<div className={styles.actions}>
						<button
							type="button"
							className={styles.btnSecondary}
							onClick={handleReset}
						>
							Reset
						</button>
						<button
							type="submit"
							className={styles.btnPrimary}
						// disabled={loading}
						>
							Add Movie
							{/* {loading ? "Saving…" : "Add Movie"} */}
						</button>
					</div>

				</form>
			</div>
		</div>
	);
}
