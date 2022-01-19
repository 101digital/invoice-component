import React, { useContext, useEffect, useState } from 'react';
import {
  BottomSheet,
  Button,
  DateRangePicker,
  formatCurrency,
  ThemeContext,
} from 'react-native-theme-component';
import { FilterModalComponentProps, FilterModalComponentStyles } from './types';
import useMergeStyles from './theme';
import { Text, TouchableOpacity, View } from 'react-native';
import { FilterTagName, InvoiceParam, InvoiceStatusType } from '../../../types';
import moment from 'moment';
import { InvoiceService } from '../../../service/invoice-service';
import RangeSliderComponent from '../range-slider-component';

const FilterModalComponent = (props: FilterModalComponentProps) => {
  const {
    isVisible,
    onClose,
    style,
    currencyCode,
    onApply,
    sliderActiveColor,
    sliderInActiveColor,
    onCancel,
    initParam,
    dateFormat,
  } = props;
  const styles: FilterModalComponentStyles = useMergeStyles(style);
  const [status, setStatus] = useState<InvoiceStatusType>(InvoiceStatusType.all);
  const { i18n, currencies } = useContext(ThemeContext);
  const [date, setDate] = useState(0);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const _dateFormat = dateFormat ?? 'DD MMM YYYY';
  const { minAmount, maxFilterAmount } = InvoiceService.instance().getMaxMinAmount();
  const [lowAmount, setLowAmount] = useState(minAmount);
  const [highAmount, setHighAmount] = useState(maxFilterAmount);
  const [isShowDateRange, setShowDateRange] = useState(false);

  useEffect(() => {
    setShowDateRange(false);
  }, [isVisible]);

  useEffect(() => {
    if (initParam.searchStatus === undefined) {
      setStatus(InvoiceStatusType.all);
    }
    if (initParam.fromDate === undefined && initParam.toDate === undefined) {
      setDate(0);
    }
    if (initParam.fromTotalAmount === undefined && initParam.toTotalAmount === undefined) {
      setLowAmount(0);
      setHighAmount(maxFilterAmount);
    }
  }, [initParam]);

  const toggleDateRangeModal = () => setShowDateRange(!isShowDateRange);

  const _renderSectionItem = (
    value: string,
    isActived: boolean,
    onPressed: () => void,
    isLast?: boolean
  ) => {
    const _containerStyle = isActived
      ? styles.activeItemContainerStyle
      : styles.inActiveItemContainerStyle;
    const _valueTextStyle = isActived ? styles.activeItemTextStyle : styles.inActiveItemTextStyle;
    return (
      <TouchableOpacity
        onPress={onPressed}
        activeOpacity={0.8}
        style={[_containerStyle, { marginRight: isLast ? 0 : 10 }]}
      >
        <Text style={_valueTextStyle}>{value}</Text>
      </TouchableOpacity>
    );
  };

  const processDate = () => {
    let fromDate;
    let toDate;
    const today = moment();
    const formatDate = 'YYYY-MM-DD';
    if (date === 1) {
      fromDate = today.startOf('day').format(formatDate);
      toDate = today.endOf('day').format(formatDate);
    } else if (date === 2) {
      fromDate = today.startOf('week').format(formatDate); // sunday
      toDate = today.endOf('week').add(1, 'day').format(formatDate); // saturday
    } else if (date === 3) {
      fromDate = today.startOf('month').format(formatDate);
      toDate = today.endOf('month').format(formatDate);
    } else if (date === 4) {
      fromDate = today.startOf('year').format(formatDate);
      toDate = today.endOf('year').format(formatDate);
    } else if (date === 5) {
      fromDate = startDate;
      toDate = endDate;
    }
    return { fromDate, toDate };
  };

  const getMethodName = () => ({
    id: 'status',
    value: status,
  });

  const getDateName = () => {
    let name;
    switch (date) {
      case 1:
        name = i18n.t('invoice_search_component.lbl_today');
        break;
      case 2:
        name = i18n.t('invoice_search_component.lbl_this_week');
        break;
      case 3:
        name = i18n.t('invoice_search_component.lbl_this_month');
        break;
      case 4:
        name = i18n.t('invoice_search_component.lbl_this_year');
        break;
      case 5:
        name = getShortDate();
        break;
      default:
        name = i18n.t('invoice_search_component.lbl_all');
        break;
    }
    return {
      id: 'date',
      value: name,
    };
  };

  const getShortDate = () => {
    if (startDate === endDate) {
      return moment(startDate, 'YYYY-MM-DD').format(_dateFormat);
    }
    return `${moment(startDate, 'YYYY-MM-DD').format(_dateFormat)} - ${moment(
      endDate,
      'YYYY-MM-DD'
    ).format(_dateFormat)}`;
  };

  const getAmount = () => ({
    id: 'amount',
    value: `${formatCurrency(currencies, lowAmount, currencyCode)} - ${formatCurrency(
      currencies,
      highAmount,
      currencyCode
    )}`,
  });

  const handleApply = () => {
    let param: InvoiceParam = {
      ...processDate(),
      fromTotalAmount: undefined,
      toTotalAmount: undefined,
      searchStatus: status === InvoiceStatusType.all ? undefined : status,
    };
    let tags: FilterTagName[] = [];
    if (status !== InvoiceStatusType.all) {
      tags.push(getMethodName());
    }
    if (date !== 0) {
      tags.push(getDateName());
    }
    if (lowAmount !== 0 || highAmount !== maxFilterAmount) {
      tags.push(getAmount());
      param = { ...param, fromTotalAmount: lowAmount, toTotalAmount: highAmount };
    }
    onApply(param, tags);
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={{
        contentContainerStyle: {
          paddingHorizontal: 0,
          paddingTop: 0,
        },
      }}
    >
      {isShowDateRange ? (
        <DateRangePicker
          isVisible={isShowDateRange}
          onClose={toggleDateRangeModal}
          onChange={(_startDate: string, _endDate: string) => {
            setDate(5);
            toggleDateRangeModal();
            setStartDate(_startDate);
            setEndDate(_endDate);
          }}
        />
      ) : (
        <View style={styles.containerStyle}>
          <View style={styles.headerContainerStyle}>
            <Text style={styles.headerTitleStyle}>
              {i18n?.t('invoice_search_component.lbl_filter') ?? 'Filter'}
            </Text>
          </View>
          <Text style={styles.labelStyle}>
            {i18n?.t('invoice_search_component.lbl_status') ?? 'Status'}
          </Text>
          <View style={styles.itemListContainerStyle}>
            {_renderSectionItem(
              i18n?.t('invoice_search_component.lbl_all') ?? 'All',
              status === InvoiceStatusType.all,
              () => setStatus(InvoiceStatusType.all)
            )}
            {_renderSectionItem(
              i18n?.t('invoice_search_component.lbl_paid_invoices') ?? 'Paid',
              status === InvoiceStatusType.paid,
              () => setStatus(InvoiceStatusType.paid)
            )}
            {_renderSectionItem(
              i18n?.t('invoice_search_component.lbl_due_invoices') ?? 'Due',
              status === InvoiceStatusType.due,
              () => setStatus(InvoiceStatusType.due)
            )}
            {_renderSectionItem(
              i18n?.t('invoice_search_component.lbl_overdue_invoices') ?? 'Overdue',
              status === InvoiceStatusType.overDue,
              () => setStatus(InvoiceStatusType.overDue),
              true
            )}
          </View>
          <Text style={styles.labelStyle}>
            {i18n?.t('invoice_search_component.lbl_invoice_date') ?? 'Invoice date'}
          </Text>
          <View style={styles.itemListContainerStyle}>
            {_renderSectionItem(
              i18n?.t('invoice_search_component.lbl_all') ?? 'All',
              date === 0,
              () => setDate(0)
            )}
            {_renderSectionItem(
              i18n?.t('invoice_search_component.lbl_today') ?? 'Today',
              date === 1,
              () => setDate(1)
            )}
            {_renderSectionItem(
              i18n?.t('invoice_search_component.lbl_this_week') ?? 'This week',
              date === 2,
              () => setDate(2)
            )}
            {_renderSectionItem(
              i18n?.t('invoice_search_component.lbl_this_month') ?? 'This month',
              date === 3,
              () => setDate(3)
            )}
            {_renderSectionItem(
              i18n?.t('invoice_search_component.lbl_this_year') ?? 'This year',
              date === 4,
              () => setDate(4)
            )}
            {_renderSectionItem(
              date === 5
                ? getShortDate()
                : i18n?.t('invoice_search_component.lbl_custom_date') ?? 'Custom date',
              date === 5,
              toggleDateRangeModal,
              true
            )}
          </View>
          <Text style={styles.labelStyle}>
            {i18n?.t('invoice_search_component.lbl_invoice_amount') ?? 'Invoice amount'}
          </Text>
          <View style={styles.sliderContainerStyle}>
            <RangeSliderComponent
              activeColor={sliderActiveColor}
              inActiveColor={sliderInActiveColor}
              step={5}
              min={minAmount}
              max={maxFilterAmount}
              initLow={lowAmount}
              initHigh={highAmount}
              onValueChanged={(low: number, high: number) => {
                setLowAmount(low);
                setHighAmount(high);
              }}
            />
            <Text style={styles.sliderValueStyle}>{getAmount().value}</Text>
          </View>
          <View style={styles.footerContainerStyle}>
            <Button
              onPress={onCancel}
              label={i18n?.t('invoice_search_component.btn_cancel') ?? 'Cancel'}
              variant='secondary'
              style={
                style?.cancelButtonStyle ?? {
                  secondaryContainerStyle: {
                    flex: 1,
                    marginRight: 7.5,
                  },
                }
              }
            />
            <Button
              onPress={handleApply}
              label={i18n?.t('invoice_search_component.btn_apply') ?? 'Apply'}
              style={
                style?.applyButtonStyle ?? {
                  primaryContainerStyle: {
                    flex: 1,
                    marginLeft: 7.5,
                  },
                }
              }
            />
          </View>
        </View>
      )}
    </BottomSheet>
  );
};

export default FilterModalComponent;
