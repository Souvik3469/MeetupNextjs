import Link from 'next/link';

import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Travelogue</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Places</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Place</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;