import os
import sys
import operations  # pylint: disable=import-error


def test_get_one_news_basic():
    news = operations.get_one_news()
    print(news)
    assert news is not None
    print('test_get_one_news_basic passed!')


def test_getNewsSummariesForUser_basic():
    news = operations.getNewsSummariesForUser('news', 1)
    assert len(news) > 0
    print('test_getNewsSummariesForUser_basic passed')


def test_getNewsSummariesForUser_pagination():
    news_page_1 = operations.getNewsSummariesForUser('news', 1)
    news_page_2 = operations.getNewsSummariesForUser('news', 2)

    assert len(news_page_1) > 0
    assert len(news_page_2) > 0

    digests_page_1_set = set([news['digest'] for news in news_page_1])
    digests_page_2_set = set([news['digest'] for news in news_page_2])

    assert len(digests_page_1_set.intersection(digests_page_2_set)) == 0

    print('test_getNewsSummariesForUser_pagination passed!')


if __name__ == '__main__':
    test_get_one_news_basic()
    test_getNewsSummariesForUser_basic()
    test_getNewsSummariesForUser_pagination()
