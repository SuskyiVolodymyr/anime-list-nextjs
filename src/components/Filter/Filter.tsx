'use client' // eslint-disable-line prettier/prettier
import React, { useState } from 'react';
import { OrderBy } from '@/types/OrderBy';
import { useRouter, useSearchParams } from 'next/navigation';
import { manageQueryParams } from '@/services/manageQueryParams';
import { AnimeTvType } from '@/types/AnimeTvType';
import { OrderSelect } from '@/components/Filter/OrderSelect/OrderSelect';
import { TvTypeSelect } from '@/components/Filter/TvTypeSelect/TvTypeSelect';
import { MinMaxScore } from '@/components/Filter/MinMaxScore/MinMaxScore';
import { AnimeStatus } from '@/types/AnimeStatus';
import { AnimeStatusFilter } from '@/components/Filter/AnimeStatusFilter/AnimeStatusFilter';
import { StartEndDate } from '@/components/Filter/StartEndDate/StartEndDate';

export const Filter = () => {
  const params = useSearchParams();
  const paramsValues = {
    orderBy: params.get('order_by') as OrderBy,
    sort: params.get('sort'),
    type: params.get('type') as AnimeTvType,
    minScore: params.get('min_score'),
    maxScore: params.get('max_score'),
    animeStatus: params.get('anime_status') as AnimeStatus,
    beforeYear: params.get('end_date')?.slice(0, 4),
    afterYear: params.get('start_date')?.slice(0, 4),
  };
  const [orderBy, setOrderBy] = useState(paramsValues.orderBy || OrderBy.None);
  const [isASC, setIsASC] = useState(paramsValues.sort ? paramsValues.sort === 'asc' : false);
  const [animeType, setAnimeType] = useState(paramsValues.type || AnimeTvType.None);
  const [minScore, setMinScore] = useState(paramsValues.minScore || '');
  const [maxScore, setMaxScore] = useState(paramsValues.maxScore || '');
  const [status, setStatus] = useState(paramsValues.animeStatus || AnimeStatus.None);
  const [beforeYear, setBeforeYear] = useState(paramsValues.beforeYear || '');
  const [afterYear, setAfterYear] = useState(paramsValues.afterYear || '');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sort = isASC ? 'asc' : 'desc';
    const currentParams = manageQueryParams([
      { key: 'order_by', value: orderBy },
      { key: 'sort', value: orderBy ? sort : '' },
      { key: 'type', value: animeType },
      { key: 'min_score', value: minScore },
      { key: 'max_score', value: maxScore },
      { key: 'anime_status', value: status },
      { key: 'start_date', value: afterYear ? afterYear + '-01-01' : '' },
      { key: 'end_date', value: beforeYear ? beforeYear + '-01-01' : '' },
    ]);

    router.push('?' + currentParams);
  };

  return (
    <div className="filter">
      <form className="filter-form" onSubmit={handleSubmit}>
        <OrderSelect setOrderBy={setOrderBy} setIsASC={setIsASC} order={orderBy} isAsc={isASC} />
        <TvTypeSelect setAnimeType={setAnimeType} animeType={animeType} />
        <MinMaxScore
          minScore={minScore}
          maxScore={maxScore}
          setMinScore={setMinScore}
          setMaxScore={setMaxScore}
        />
        <AnimeStatusFilter setAnimeStatus={setStatus} animeStatus={status} />
        <StartEndDate
          afterYear={afterYear}
          beforeYear={beforeYear}
          setAfterYear={setAfterYear}
          setBeforeYear={setBeforeYear}
        />
        <button className="filter-button" type="submit">
          Filter
        </button>
      </form>
    </div>
  );
};
