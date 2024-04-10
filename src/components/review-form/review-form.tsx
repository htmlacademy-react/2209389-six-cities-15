import { FormEvent, Fragment, ReactEventHandler, useState } from 'react';
import { toast } from 'react-toastify';
import { RATINGS, REVIEW_LENGTH, RequestStatus } from '../../const';
import { useActionCreators, useAppSelector } from '../../hooks/store';
import { commentsThunk } from '../../store/thunks/comments';
import { reviewSelector } from '../../store/slices/reviews';


type TChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>

type ReviewFormProps = {
  offerId: string;
}

const TOASTIFY_ERROR_MESSAGE = 'Не удалось выполнить отправку комментария. Проверьте подключение';

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const [review, setReview] = useState({ rating: 0, review: '' });
  const handleChange: TChangeHandler = (evt) => {
    const { name, value } = evt.currentTarget;
    setReview({ ...review, [name]: value });
  };
  const { postComment } = useActionCreators(commentsThunk);
  const reviewStatus = useAppSelector(reviewSelector.reviewsStatus);
  const isLoading = reviewStatus === RequestStatus.Loading;
  const reviewIsInvalid = review.review.length < REVIEW_LENGTH.MIN_REVIEW_LENGTH || review.review.length > REVIEW_LENGTH.MAX_REVIEW_LENGTH || review.rating === 0;
  const handleSubmit = (event: FormEvent) => {

    event.preventDefault();
    // Использую offerId из пропсов и состояние формы для отправки комментария
    postComment({
      offerId,
      body: {
        comment: review.review,
        rating: Number(review.rating),
      }
    }).unwrap() // использование unwrap() для обработки Promise
      .then(() => {
        setReview({ rating: 0, review: '' }); // сброс формы
      })
      .catch(() => {
        toast.error(TOASTIFY_ERROR_MESSAGE);
      });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATINGS.map(({ value, label }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={value}
              id={`${value}-stars`}
              type="radio"
              onChange={handleChange}
              checked={Number(review.rating) === value}
              disabled={isLoading}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={label}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleChange}
        value={review.review} // вот так устанавливаем состояние текста отзыва
        disabled={isLoading}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={reviewIsInvalid || isLoading}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;

