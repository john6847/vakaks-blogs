import { cn } from '@/lib/utils';
import type { LexicalEditor, NodeKey } from "lexical";
import Image from 'next/image';

import * as React from "react";
import { Suspense, useRef } from "react";

/* const imageCache = new Set(); */

/* function useSuspenseImage(src: string) {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
  }
}
 */
function LazyImage({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  maxWidth
}: {
  altText: string;
  className: string | null;
  height: "inherit" | number;
  imageRef: { current: null | HTMLImageElement };
  maxWidth: number;
  src: string;
  width: "inherit" | number;
}): JSX.Element {src;
  return (
    <Image
      className={cn(className, " h-full w-full ")}
      src={src}
      alt={altText}
      ref={imageRef}
      width="1920"
      height="1920"
      loading='eager'
      style={{
        height,
        maxWidth,
        width
      }}
    />
  );
}

export default function ImageComponent({
  src,
  altText,
  width,
  height,
  maxWidth
}: {
  altText: string;
  caption: LexicalEditor;
  height: "inherit" | number;
  maxWidth: number;
  nodeKey: NodeKey;
  resizable: boolean;
  showCaption: boolean;
  src: string;
  width: "inherit" | number;
  captionsEnabled: boolean;
}): JSX.Element {
  const imageRef = useRef<null | HTMLImageElement>(null);

  return (
    <Suspense fallback={null}>
      <>
        <div>
          <LazyImage
            className=""
            src={src}
            altText={altText}
            imageRef={imageRef}
            width={width}
            height={height}
            maxWidth={maxWidth}
          />
        </div>
      </>
    </Suspense>
  );
}
