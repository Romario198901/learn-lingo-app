import css from './Statistics.module.css';

const statistics = [
  {
    value: '32,000+',
    label: 'Experienced tutors',
  },
  {
    value: '300,000+',
    label: '5-star tutor reviews',
  },
  {
    value: '120+',
    label: 'Subjects taught',
  },
  {
    value: '200+',
    label: 'Tutor nationalities',
  },
];

export default function Statistics() {
  return (
    <section className={css.statistics}>
      <ul className={css.list}>
        {statistics.map(item => (
          <li className={css.item} key={item.label}>
            <strong className={css.value}>{item.value}</strong>
            <span className={css.label}>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}