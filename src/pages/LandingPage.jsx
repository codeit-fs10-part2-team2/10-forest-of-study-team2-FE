import { useState, useMemo, useEffect, useRef } from 'react';
import LandingTemplate from '../template/LandingTemplate';
import useGetRequestHandler from '../hooks/useGetRequestHandler';
import API_ENDPOINTS from '../utils/apiEndpoints';
import { getRecentStudyQueue } from '../utils/recentStudyQueue';
import axiosInstance from '../utils/axiosInstance';

const LandingPage = () => {
  const { data, loading, error } = useGetRequestHandler(API_ENDPOINTS.STUDIES.GET_ALL, {
    enabled: true,
    onSuccess: (data) => {
      console.log('Studies fetched successfully:', data);
    },
    onError: (error) => {
      console.error('Failed to fetch studies:', error);
    },
  });

  const transformStudies = (apiData) => {
    if (!apiData?.data?.studies) {
      return [];
    }

    return apiData.data.studies.map((study) => ({
      id: study.study_id,
      studyName: study.study_name,
      introduction: study.study_introduction,
      point: study.point_sum,
      thumbNail: study.background,
      createdAt: study.createdAt,
      nickName: '',
      stats: []
    }));
  };

  const transformRecentStudies = (apiData) => {
    if (!apiData?.data || !Array.isArray(apiData.data)) {
      return [];
    }

    return apiData.data.map((study) => ({
      id: study.study_id,
      studyName: study.study_name,
      introduction: study.study_introduction,
      point: study.point_sum,
      thumbNail: study.background,
      createdAt: study.createdAt,
      nickName: study.nickname || '',
      stats: []
    }));
  };

  useEffect(() => {
    const searchChanged = prevSearchRef.current !== debouncedSearchKeyword;
    const sortChanged = prevSortRef.current !== sortOption;
    
    if (searchChanged || sortChanged) {
      setAccumulatedStudies([]);
      setPage(1);
      prevSearchRef.current = debouncedSearchKeyword;
      prevSortRef.current = sortOption;
    }
  }, [debouncedSearchKeyword, sortOption]);

  useEffect(() => {
    if (data?.data?.studies && data?.data?.pagination) {
      const responsePage = data.data.pagination.page;
      const transformed = transformStudies(data);
      
      if (responsePage === page) {
        if (page === 1) {
          setAccumulatedStudies(transformed);
        } else {
          setAccumulatedStudies(prev => {
            const existingIds = new Set(prev.map(study => study.id));
            const newStudies = transformed.filter(study => !existingIds.has(study.id));
            return [...prev, ...newStudies];
          });
        }

        if (shouldClearSearchRef.current && !loading) {
          setSearchKeyword('');
          shouldClearSearchRef.current = false;
        }
      }
    }
  }, [data, page, loading]);

  const fetchRecentStudies = async () => {
    const studyIds = getRecentStudyQueue();
    
    if (studyIds.length === 0) {
      setRecentStudies([]);
      return;
    }

    setRecentStudiesLoading(true);
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.STUDIES.BATCH, {
        study_ids: studyIds
      });
      
      const transformed = transformRecentStudies(response.data);
      setRecentStudies(transformed);
    } catch (error) {
      setRecentStudies([]);
    } finally {
      setRecentStudiesLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentStudies();
  }, []);

  useEffect(() => {
    const handleRecentStudyUpdate = () => {
      fetchRecentStudies();
    };

    window.addEventListener('recentStudyUpdated', handleRecentStudyUpdate);

    return () => {
      window.removeEventListener('recentStudyUpdated', handleRecentStudyUpdate);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      setDebouncedSearchKeyword(searchKeyword);
      shouldClearSearchRef.current = true;
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (loading && !data) {
    return null;
  }

  if (error) {
    return null;
  }

  const studies = accumulatedStudies;
  const hasMore = data?.data?.pagination 
    ? page < data.data.pagination.totalPages 
    : false;

  return (
    <LandingTemplate 
      studies={studies}
      recentStudies={recentStudies}
      searchKeyword={searchKeyword}
      sortOption={sortOption}
      onSearchChange={handleSearchChange}
      onSearchKeyDown={handleSearchKeyDown}
      onSortChange={handleSortChange}
      onLoadMore={handleLoadMore}
      hasMore={hasMore}
      loading={loading}
    />
  );
};

export default LandingPage;