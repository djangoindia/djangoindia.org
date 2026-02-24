'use client';

import { useRef, useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';

const HTMLRender = ({
  html,
  className,
}: {
  html: string;
  className: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current && html) {
      const sanitizedContent =
        typeof sanitizeHtml === 'function' ? sanitizeHtml(html) : html;

      divRef.current.innerHTML = sanitizedContent;
    }
  }, [html]);

  return <div ref={divRef} className={className} />;
};

export { HTMLRender };
