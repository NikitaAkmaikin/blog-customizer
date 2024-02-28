import { useState, FormEvent } from 'react';
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
	SubmitForm: (e: FormEvent<HTMLFormElement>) => void;
	ResetForm: () => void;
};

export const ArticleParamsForm = ({
	setSidebar,
	sidebar,
	SubmitForm,
	ResetForm,
}: TArticleParamsForm) => {
	const [isOpen, setIsOpen] = useState(false);

	const ToggleForm = () => {
		return setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} toggleForm={ToggleForm} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={SubmitForm}>
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
						<Button title='Сбросить' type='reset' onClick={ResetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
