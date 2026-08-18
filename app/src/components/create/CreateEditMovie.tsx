import styles from "./CreateEditMovie.module.css";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import type { ValidateValue } from "../../types/types";
import { validate } from "../../utils/validate";
import { useNavigate, useParams } from "react-router";

const currentYear = new Date().getFullYear();

const initialValues1 = {
	title: "",
	year: "",
	rating: "1.0",
	genre: "",
	poster: "",
	synopsis: "",
	duration: "",
	director: "",
	trailerUrl: "",
	tagline: "",
	writtenBy: "",
	studio: "",
	releaseDate: "",
	language: "",
	country: "",
	budget: "",
	boxOffice: ""
};

function isValidUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

export default function CreateEditMovie() {
	const movieId = useParams().movieId;
	const isEdit = movieId? true : false;
	const { request, data: movie } = useFetch(`/movies/${movieId}`, undefined, isEdit);

	const film = !Array.isArray(movie) ? movie : undefined;

	const initialValues = {
	title: "",
	year: "",
	rating: "1.0",
	genre: "",
	poster: "",
	synopsis: "",
	duration: "",
	director: "",
	trailerUrl: "",
	tagline: "",
	writtenBy: "",
	studio: "",
	releaseDate: "",
	language: "",
	country: "",
	budget: "",
	boxOffice: ""
};


	const { formInputRegister, data, setData } = useForm(initialValues)
	const { user, onLogout } = useContext(UserContext)
	const [errors, setErrors] = useState<ValidateValue>({});
	const [touched, setTouched] = useState<ValidateValue>({});
	const navigate = useNavigate();



	function validateHandler(event: React.BaseSyntheticEvent) {
		setTouched((state) => ({
			...state,
			[event.target.name]: true
		}));

		const fieldErrors = validate(data);
		setErrors(fieldErrors);
	};

	async function actionHandler() {
		const fieldErrors = validate(data);
		setErrors(fieldErrors);
		setTouched(fieldErrors);

		if (Object.keys(fieldErrors).length > 0) {
			return;
		};

		try {
			await request("/movies/create", "POST", { accessToken: user.accessToken }, data);
			setErrors({});

			navigate("/");
		} catch (error) {

			if (error instanceof Error) {
				alert(error.message)
			} else if (typeof error === "string") {
				alert(error);

				if (error === "Invalid token") {
					onLogout("/login");
				};

			} else {
				alert("An unexpected error occurred");
			};
		};
	}

	const handleReset = () => {
		setData(initialValues);
		setTouched({});
		setErrors({});
	};

	const showPosterPreview = data.poster.trim() !== "" && isValidUrl(data.poster);

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>

				{/* ─── Page header ─── */}
				<div className={styles.pageEyebrow}>Film Management</div>
				<h1 className={styles.pageTitle}>{movieId ? `Edit Movie "${film?.title}"` : "Add a New Movie"}</h1>
				<p className={styles.pageSubtitle}>
					{movieId ? "Modify the details below to update the movie information." : "Fill in the details below to add a film to the movies catalogue."}
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
									className={`${styles.input}${errors.title && touched.title ? ` ${styles["input--error"]}` : ""}`}
									placeholder="e.g. Oppenheimer"
									autoComplete="off"
									onBlur={validateHandler}
								/>
								{touched.title && <span className={styles.errorMsg}>{errors.title}</span>}
							</div>

							{/* Tagline */}
							<div className={`${styles.field} ${styles.colSpan2}`}>
								<label className={styles.label} htmlFor="tagline">
									Tagline <span className={styles.required}>*</span>
								</label>
								<input
									id="tagline"
									{...formInputRegister("tagline")}
									type="text"
									className={`${styles.input}${errors.tagline && touched.tagline ? ` ${styles["input--error"]}` : ""}`}
									placeholder="e.g. A Brand New Day starts now."
									autoComplete="off"
									onBlur={validateHandler}
								/>
								{touched.tagline && <span className={styles.errorMsg}>{errors.tagline}</span>}
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
									className={`${styles.input}${errors.director && touched.director ? ` ${styles["input--error"]}` : ""}`}
									placeholder="e.g. Christopher Nolan"
									onBlur={validateHandler}
								/>
								{touched.director && <span className={styles.errorMsg}>{errors.director}</span>}
							</div>

							{/* Written by */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="writtenBy">
									Written by <span className={styles.required}>*</span>
								</label>
								<input
									id="writtenBy"
									{...formInputRegister("writtenBy")}
									type="text"
									className={`${styles.input}${errors.writtenBy && touched.writtenBy ? ` ${styles["input--error"]}` : ""}`}
									placeholder="e.g. Manel Santisteban"
									onBlur={validateHandler}
								/>
								{touched.writtenBy && <span className={styles.errorMsg}>{errors.writtenBy}</span>}
							</div>

							{/* Genre */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="genre">
									Genre <span className={styles.required}>*</span>
								</label>
								<input
									id="genre"
									{...formInputRegister("genre")}
									className={`${styles.input}${errors.genre && touched.genre ? ` ${styles["input--error"]}` : ""}`}
									// className={`${styles.select}${errors.genre ? ` ${styles["select--error"]}` : ""}`}
									onBlur={validateHandler}
								/>
								{touched.genre && <span className={styles.errorMsg}>{errors.genre}</span>}
							</div>

						</div>
					</div>

					{/* ─── Card 2: Details ─── */}
					<div className={styles.card}>
						<div className={styles.cardTitle}>Film Details</div>

						<div className={styles.formGridThree}>

							{/* Release date */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="releaseDate">
									Release date <span className={styles.required}>*</span>
								</label>
								<input
									id="releaseDate"
									type="text"
									{...formInputRegister("releaseDate")}
									className={`${styles.input}${errors.releaseDate && touched.releaseDate ? ` ${styles["input--error"]}` : ""}`}
									placeholder="e.g. May 2"
									onBlur={validateHandler}
								/>
								{touched.releaseDate && <span className={styles.errorMsg}>{errors.releaseDate}</span>}
							</div>

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
									className={`${styles.input}${errors.year && touched.year ? ` ${styles["input--error"]}` : ""}`}
									placeholder={String(currentYear)}
									onBlur={validateHandler}
								/>
								{touched.year && <span className={styles.errorMsg}>{errors.year}</span>}
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
									className={`${styles.input}${errors.duration && touched.duration ? ` ${styles["input--error"]}` : ""}`}
									placeholder="e.g. 2h 46m"
									onBlur={validateHandler}
								/>
								{touched.duration && <span className={styles.errorMsg}>{errors.duration}</span>}
								{errors.duration && (
									<span className={styles.inputHint}>Format: 2h 15m</span>
								)}
							</div>

							{/* Studio */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="studio">
									Studio <span className={styles.required}>*</span>
								</label>
								<input
									id="studio"
									{...formInputRegister("studio")}
									type="text"
									className={`${styles.input}${errors.studio && touched.studio ? ` ${styles["input--error"]}` : ""}`}
									placeholder="e.g. Netflix"
									onBlur={validateHandler}
								/>
								{touched.studio && <span className={styles.errorMsg}>{errors.studio}</span>}
							</div>

							{/* Language */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="language">
									Language <span className={styles.required}>*</span>
								</label>
								<input
									id="language"
									{...formInputRegister("language")}
									type="text"
									className={`${styles.input}${errors.language && touched.language ? ` ${styles["input--error"]}` : ""}`}
									placeholder="e.g. English"
									onBlur={validateHandler}
								/>
								{touched.language && <span className={styles.errorMsg}>{errors.language}</span>}
							</div>

							{/* Country */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="country">
									Country <span className={styles.required}>*</span>
								</label>
								<input
									id="country"
									{...formInputRegister("country")}
									type="text"
									className={`${styles.input}${errors.country && touched.country ? ` ${styles["input--error"]}` : ""}`}
									placeholder="e.g. USA"
									onBlur={validateHandler}
								/>
								{touched.country && <span className={styles.errorMsg}>{errors.country}</span>}
							</div>

							{/* Budget */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="budget">
									Budget <span className={styles.required}>*</span>
								</label>
								<input
									id="budget"
									{...formInputRegister("budget")}
									type="text"
									className={`${styles.input}${errors.budget && touched.budget ? ` ${styles["input--error"]}` : ""}`}
									placeholder="e.g. $100M"
									onBlur={validateHandler}
								/>
								{touched.budget && <span className={styles.errorMsg}>{errors.budget}</span>}
							</div>

							{/* BoxOffice */}
							<div className={styles.field}>
								<label className={styles.label} htmlFor="boxOffice">
									BoxOffice <span className={styles.required}>*</span>
								</label>
								<input
									id="boxOffice"
									{...formInputRegister("boxOffice")}
									type="text"
									className={`${styles.input}${errors.boxOffice && touched.boxOffice ? ` ${styles["input--error"]}` : ""}`}
									placeholder="e.g. $100 000M"
									onBlur={validateHandler}
								/>
								{touched.boxOffice && <span className={styles.errorMsg}>{errors.boxOffice}</span>}
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
										onBlur={validateHandler}
									/>
									<span className={styles.ratingBadge}>★ {Number(data.rating).toFixed(1)}</span>
								</div>
								{touched.rating && <span className={styles.errorMsg}>{errors.rating}</span>}
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
									className={`${styles.input}${errors.poster && touched.poster ? ` ${styles["input--error"]}` : ""}`}
									placeholder="https://…"
									onBlur={validateHandler}
								/>
								{touched.poster && <span className={styles.errorMsg}>{errors.poster}</span>}

								{/* Live poster preview */}
								<div className={styles.posterPreviewWrapper}>
									{showPosterPreview ? (
										<img
											src={data.poster}
											alt="Poster preview"
											className={styles.posterPreviewImg}
											onBlur={validateHandler}
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
									className={`${styles.input}${errors.trailerUrl && touched.trailerUrl ? ` ${styles["input--error"]}` : ""}`}
									placeholder="https://youtube.com/…"
									onBlur={validateHandler}
								/>
								{touched.trailerUrl && <span className={styles.errorMsg}>{errors.trailerUrl}</span>}
								{!errors.trailerUrl && (
									<span className={styles.inputHint}>Optional — YouTube or Vimeo link</span>
								)}
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
								className={`${styles.textarea}${errors.synopsis && touched.synopsis ? ` ${styles["input--error"]}` : ""}`}
								placeholder="Write a short description of the film…"
								rows={5}
								onBlur={validateHandler}
							/>
							{touched.synopsis && <span className={styles.errorMsg}>{errors.synopsis}</span>}
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
						</button>
					</div>

				</form>
			</div>
		</div>
	);
}
