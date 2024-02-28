import { useState } from 'react';
import 'src/styles/index.scss';
import styles from './index.module.scss';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState } from 'src/constants/articleProps';

export const App = () => {
	const [pageState, setPageState] = useState(defaultArticleState);
	const [sidebar, setSidebar] = useState(defaultArticleState);

	const SubmitForm = (e) => {
		e.preventDefault();

		setPageState({
			...pageState,
			fontFamilyOption: sidebar.fontFamilyOption,
			fontSizeOption: sidebar.fontSizeOption,
			fontColor: sidebar.fontColor,
			contentWidth: sidebar.contentWidth,
			backgroundColor: sidebar.backgroundColor,
		});
	};

	const ResetForm = () => {
		setSidebar(defaultArticleState);
		setPageState(defaultArticleState);
	};

	return (
		<main
			className={styles.main}
			style={{
				'--font-family': pageState.fontFamilyOption.value,
				'--font-size': pageState.fontSizeOption.value,
				'--font-color': pageState.fontColor.value,
				'--container-width': pageState.contentWidth.value,
				'--bg-color': pageState.backgroundColor.value,
			}}>
			<ArticleParamsForm
				sidebar={sidebar}
				setSidebar={setSidebar}
				SubmitForm={SubmitForm}
				ResetForm={ResetForm}
			/>

			<Article />
		</main>
	);
};
