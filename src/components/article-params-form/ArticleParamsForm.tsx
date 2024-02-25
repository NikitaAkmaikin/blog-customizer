import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { useState, useEffect, useRef, ReactNode } from 'react';
import { Text } from '../text';

type TArticleParamsForm = {
	children: ReactNode;
	formSubmit: (e: React.MouseEvent) => void;
	formReset: () => void;
};

export const ArticleParamsForm = ({
	children,
	formSubmit,
	formReset,
}: TArticleParamsForm) => {
	// Открытие/Закрытие боковой панели
	const containerOpenRef = useRef<HTMLElement | null>(null);
	const [isValid, setIsValid] = useState(false);

	const buttonToggle = () => {
		return setIsValid(!isValid);
	};

	useEffect(() => {
		containerOpenRef.current?.classList.toggle(styles.container_open);
	}, [isValid]);

	return (
		<>
			<ArrowButton isValid={isValid} toggle={buttonToggle} />
			<aside className={styles.container} ref={containerOpenRef}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						<p style={{ color: '#000' }}>задайте параметры</p>
					</Text>

					{children}

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={formReset} />
						<Button title='Применить' type='submit' onClick={formSubmit} />
					</div>
				</form>
			</aside>
		</>
	);
};
