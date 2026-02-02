'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        'animate-pulse bg-muted rounded-md',
        className
      )}
    />
  );
}

interface SkeletonCardProps {
  className?: string;
  rows?: number;
  showHeader?: boolean;
  showFooter?: boolean;
}

export function SkeletonCard({
  className,
  rows = 3,
  showHeader = true,
  showFooter = false,
}: SkeletonCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn('bg-card border rounded-xl p-6 space-y-4', className)}>
      {showHeader && (
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>

      {showFooter && (
        <div className="pt-4 border-t flex justify-between">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      )}
    </div>
  );
}

interface SkeletonListProps {
  className?: string;
  items?: number;
  itemHeight?: string;
}

export function SkeletonList({
  className,
  items = 5,
  itemHeight = 'h-16',
}: SkeletonListProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <motion.div
          key={i}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          className="flex items-center gap-4"
        >
          <Skeleton className={cn('w-full rounded-lg', itemHeight)} />
        </motion.div>
      ))}
    </div>
  );
}

interface SkeletonStatsProps {
  className?: string;
  cards?: number;
}

export function SkeletonStats({ className, cards = 4 }: SkeletonStatsProps) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {Array.from({ length: cards }).map((_, i) => (
        <div key={i} className="bg-card border rounded-xl p-6 space-y-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}

interface SkeletonTableProps {
  className?: string;
  rows?: number;
  columns?: number;
}

export function SkeletonTable({
  className,
  rows = 5,
  columns = 4,
}: SkeletonTableProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Header */}
      <div className="flex gap-4 pb-4 border-b">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-6 flex-1" />
        ))}
      </div>
      
      {/* Rows */}
      <div className="space-y-4 pt-4">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-12 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

interface SkeletonTextProps {
  className?: string;
  lines?: number;
  lastLineWidth?: string;
}

export function SkeletonText({
  className,
  lines = 3,
  lastLineWidth = 'w-2/3',
}: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines - 1 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
      <Skeleton className={cn('h-4', lastLineWidth)} />
    </div>
  );
}
