import { REVIEW_COUNT } from '../../const';
import { Review } from '../../types/reviews';

type reviewProps = {
  reviews: Review[];
}

const RATING_WIDTH_STEP = 20;

function ReviewsList({ reviews }: reviewProps): JSX.Element {
  const sortedReviews = reviews
    .map((review) => ({ ...review, date: new Date(review.date) }))
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(REVIEW_COUNT.MIN_REVIEW_COUNT, REVIEW_COUNT.MAX_REVIEW_COUNT);

  return (
    <ul className="reviews__list">
      {sortedReviews.map(({ user: { avatarUrl, name }, comment, date, rating }) => (
        <li className="reviews__item" key={crypto.randomUUID()}>
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img
                className="reviews__avatar user__avatar"
                src={avatarUrl}
                width={54}
                height={54}
                alt="Reviews avatar"
              />
            </div>
            <span className="reviews__user-name">{name}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{ width: `${rating * RATING_WIDTH_STEP}%` }} />
                <span className="visually-hidden">{rating}</span>
              </div>
            </div>
            <p className="reviews__text">
              {comment}
            </p>
            <time className="reviews__time" dateTime={date.toISOString()}>
              {new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </time>
          </div>
        </li>
      ))}

    </ul>);
}

export default ReviewsList;
