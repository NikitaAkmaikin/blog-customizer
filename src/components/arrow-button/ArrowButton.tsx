import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import { useEffect, useRef } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type Props = {
	isValid: boolean;
	toggle: OnClick;
};

export const ArrowButton = (props: Props) => {
	const buttonRef = useRef<HTMLDivElement | null>(null);
	const arrowRef = useRef<HTMLImageElement | null>(null);

	useEffect(() => {
		buttonRef.current?.classList.toggle(styles.container_open); // Открыть/Закрыть форму параметров статьи
		arrowRef.current?.classList.toggle(styles.arrow_open); // Меняет направление стрелки
	}, [props.isValid]);

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={props.toggle}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={styles.container}
			ref={buttonRef}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={styles.arrow}
				ref={arrowRef}
			/>
		</div>
	);
};
