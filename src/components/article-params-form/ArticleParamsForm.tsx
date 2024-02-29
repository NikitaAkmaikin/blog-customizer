import { useState, FormEvent, useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from './../separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

type TArticleParamsForm = {
	setSidebar: any;
	sidebar: any;
	submitForm: (e: FormEvent<HTMLFormElement>) => void;
	resetForm: () => void;
};

export const ArticleParamsForm = ({
	setSidebar,
	sidebar,
	submitForm,
	resetForm,
}: TArticleParamsForm) => {
	// Состояние боковой панели
	const [isOpen, setIsOpen] = useState(false);

	// Изменения состояния боковой панели
	const toggleForm = () => {
		return setIsOpen(!isOpen);
	};

	const rootRef = useRef<HTMLFormElement | null>(null);

	// Закрытие боковой панели при клику по оверлею и нажатие на кнопку "Esc"
	const useClose = () => {
		useEffect(() => {
			if (!isOpen) return; // останавливаем действие эффекта, если закрыто

			function handleClickOutside(event: MouseEvent) {
				const { target } = event;
				const isOutsideClick =
					target instanceof Node && // проверяем, что это `DOM`-элемент
					rootRef.current &&
					!rootRef.current.contains(target); // проверяем, что кликнули на элемент, который находится не внутри нашего блока
				if (isOutsideClick) {
					toggleForm();
				}
			}

			const handleEscape = (e: KeyboardEvent) => {
				if (e.key === 'Escape') {
					toggleForm();
				}
			};

			document.addEventListener('keydown', handleEscape);
			document.addEventListener('mousedown', handleClickOutside);

			//  обязательно удаляем обработчики в `clean-up`- функции
			return () => {
				document.removeEventListener('keydown', handleEscape);
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [isOpen]);
	};

	useClose();

	return (
		<>
			<ArrowButton isOpen={isOpen} toggleForm={toggleForm} />

			<aside
				// visible={console.log('ff')}
				// dismiss={this.hideModal}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={submitForm} ref={rootRef}>
					<Text as='h2' size={31} weight={800} uppercase>
						<p>задайте параметры</p>
					</Text>

					<Select
						selected={sidebar.fontFamilyOption}
						onChange={(option) =>
							setSidebar({
								...sidebar,
								fontFamilyOption: option,
							})
						}
						options={fontFamilyOptions}
						title={'шрифт'}
					/>

					<RadioGroup
						selected={sidebar.fontSizeOption}
						onChange={(option) =>
							setSidebar({
								...sidebar,
								fontSizeOption: option,
							})
						}
						options={fontSizeOptions}
						title={'размер шрифта'}
						name={'размер шрифта'}
					/>

					<Select
						selected={sidebar.fontColor}
						onChange={(option) =>
							setSidebar({
								...sidebar,
								fontColor: option,
							})
						}
						options={fontColors}
						title={'цвет шрифта'}
					/>

					<Separator />

					<Select
						selected={sidebar.backgroundColor}
						onChange={(option) =>
							setSidebar({
								...sidebar,
								backgroundColor: option,
							})
						}
						options={backgroundColors}
						title={'цвет фона'}
					/>

					<Select
						selected={sidebar.contentWidth}
						onChange={(option) =>
							setSidebar({
								...sidebar,
								contentWidth: option,
							})
						}
						options={contentWidthArr}
						title={'ширина контента'}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
